import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { DeepPartial, FindOneOptions } from "typeorm";
import { AppDataSource } from "../db/connect";
import { Book } from "../entities/book";
import { Page } from "../entities/page";
import log from "../logger";
import {
  downloadCoverImageLocally,
  downloadPagesImageLocally,
  getPagesFromContent,
} from "../service/book.service";
import { generateBookText, generateImage } from "../service/openai.service";
import nodemailer from "nodemailer";
import { generatePdfDoc, generateWordDoc } from "../utils";

type PageData = {
  pageNumber: number;
  paragraphs: string[];
};

export const BookController = {
  /** ======== Create a Book ======== **/

  createBook: async (req: Request, res: Response) => {
    const { title, ageGroup, subject, characters, lesson, page, privacy } =
      req.body;
    let newBook: Book | undefined;
        
    try {
      const bookRepository = AppDataSource.getRepository(Book);

      // Query to call OpenAi api to create book cover
      let imageDesc = `for a story book "${title}" for kids age ${ageGroup}`;
      imageDesc += subject ? ` about ${subject}` : "";

      let charactersInfo = ""; // Initialize an empty string to store character information

      if (characters.length > 0) {
        characters.forEach(
          (character: { name: string; description: string }) => {
            charactersInfo += `, ${character.name}: ${character.description}`;
          }
        );
      }

      imageDesc += charactersInfo; // Append the characters' information to the main description

      const imageUrl = await generateImage(imageDesc);

      const tagDesc = `create a three tags which are 8 characters long based on information below ${imageDesc}`;
      const tags = await generateBookText(tagDesc);

      // Check if imageUrl is not undefined before proceeding
      if (imageUrl) {
        const localImagePath = await downloadCoverImageLocally(imageUrl);

        const uid = (req as any).auth?.sub;

        newBook = bookRepository.create({
          userID: uid ?? null,
          title,
          subject,
          ageGroup,
          characters: charactersInfo,
          lesson,
          page,
          privacy,
          tag: tags,
          image: localImagePath,
        });

        await bookRepository.save(newBook);

        //Query to create the requested book content
        let desc = `create a ${page} page story book titled "${title}" with ${ageGroup}-year-old readers, with one paragraph per page`;
        desc += subject ? ` about ${subject}` : "";

        if (characters.length > 0) {
          characters.forEach(
            (character: { name: string; description: string }) => {
              desc += `, ${character.name}: ${character.description}`;
            }
          );
        }

        desc += lesson ? ` with a lesson: ${lesson}` : "";

        // Generate book content using OpenAI
        const bookContent = await generateBookText(desc);

        // Split book content into pages and paragraphs
        const paragraphsPerPage = 1;
        const pages = getPagesFromContent(bookContent, paragraphsPerPage);

        // Save pages and their paragraphs to the database
        await savePagesToDatabase(pages, newBook.id);
      } else {
        log.error("Error: Image URL is missing.");
      }
      if (newBook) {
        return res.status(201).json({
          success: 1,
          data: newBook,
        });
      } else {
        return res.status(500).json({
          success: 0,
          message: "Failed to create a new book.",
        });
      }
    } catch (error) {
      log.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },

  /** ======== Fetch all Book ======== **/

  fetchBooks: async (req: Request, res: Response) => {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const books = await bookRepository.find();
      res.json(books);
    } catch (error) {
      log.error("Error retrieving books:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving books" });
    }
  },

  /** ======== Fetch user Books ======== **/

  fetchUserBooks: async (req: Request, res: Response) => {
    try {
      const userID = req.params.userID;
      const bookRepository = AppDataSource.getRepository(Book);
      const books = await bookRepository.find({ where: { userID: userID } });

      if (!books) {
        return res.status(404).json({ error: "Books not found" });
      }
      res.json(books);
    } catch (error) {
      log.error("Error retrieving books:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving books" });
    }
  },

  /** ======== Fetch a Book by ID with it's related page ======== **/

  fetchCoverAndPagesById: async (req: Request, res: Response) => {
    try {
      const bookId = parseInt(req.params.id, 10);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }

      const bookRepository = AppDataSource.getRepository(Book);

      // Define options for findOne
      const options: FindOneOptions<Book> = {
        where: { id: bookId },
        relations: ["pages"],
      };

      const book = await bookRepository.findOne(options);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.json({ success: true, data: book });
    } catch (error) {
      log.error("Error retrieving book:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving book" });
    }
  },

  /** ======== Fetch pages of a book ======== **/

  fetchPagesForBook: async (req: Request, res: Response) => {
    try {
      const bookId = Number(req.params.bookId);
      const pageRepository = AppDataSource.getRepository(Page);
      const pages = await pageRepository.find({
        where: { book: { id: bookId } },
      });

      res.json(pages);
    } catch (error) {
      log.error("Error retrieving pages for the book:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving pages" });
    }
  },

  /** ======== Update Specific Book ======== **/

  updateBookHandler: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, subject, charName, charDesc, lesson, privacy } = req.body;

    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository.findOne({ where: { id } });

      if (!book) {
        return res.status(404).json({ success: 0, message: "Book not found" });
      }

      // Check if a new image is being uploaded
      const image = req.body.image;

      if (image) {
        // Delete the existing image
        if (book.image) {
          const imageName = path.basename(book.image);
          const imagePath = path.join(
            __dirname,
            `../../images/bookCover/${imageName}`
          );
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            log.error("Error deleting image file:", error);
          }
        }

        // Save the new image to the "book_covers" directory
        const newImageName = `${path.basename(image)}`;
        const newImagePath = path.join(
          __dirname,
          `../../images/book_covers/${newImageName}`
        );
        fs.writeFileSync(newImagePath, image, "base64");

        // Update the book's image field with the new image path
        book.image = `images/page/${newImageName}`;
      }

      // Update book fields
      book.title = title;
      book.subject = subject;
      book.lesson = lesson;
      book.privacy = privacy;

      // Save changes
      await bookRepository.save(book);
      return res
        .status(200)
        .json({ success: 1, message: "Book updated successfully" });
    } catch (error) {
      log.error("Error updating book:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while updating the book",
      });
    }
  },

  /** ======== Update Specific page ======== **/

  updatePageHandler: async (req: Request, res: Response) => {
    const pageId = parseInt(req.params.pageId);

    const { paragraph } = req.body;

    try {
      const pageRepository = AppDataSource.getRepository(Page);
      const page = await pageRepository.findOne({ where: { id: pageId } });

      if (!page) {
        return res.status(404).json({ success: 0, message: "Page not found" });
      }

      // Check if a new image is being uploaded
      if (req.file) {
        // Delete the existing image if it exists
        if (page.image) {
          const imageName = path.basename(page.image);
          const imagePath = path.join(
            __dirname,
            `../../images/page/${imageName}`
          );
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            log.error("Error deleting image file:", error);
          }
        }

        // Update the image path in the database
        page.image = `images/page/${req.file.filename}`;
      }

      // Update page content
      if (paragraph) {
        page.paragraph = paragraph;
      }

      // Save changes
      await pageRepository.save(page);
      return res
        .status(200)
        .json({ success: 1, message: "Page updated successfully" });
    } catch (error) {
      log.error("Error updating page:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while updating the page",
      });
    }
  },

  /** ======== Delete Specific Book ======== **/

  deleteBookHandler: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.pages", "page")
        .where("book.id = :id", { id })
        .getOne();

      if (!book) {
        return res.status(404).json({ success: 0, message: "Book not found" });
      }

      // Delete the associated pages and their images
      const pageIds = book.pages.map((page) => page.id);
      const pageRepository = AppDataSource.getRepository(Page);
      const pages = await pageRepository.find({
        where: pageIds.map((id) => ({ id })),
      });

      for (const page of pages) {
        if (page.image) {
          // Extract the image file name
          const imageName = path.basename(page.image);

          // Get the file path
          const imagePath = path.join(
            __dirname,
            `../../images/page/${imageName}`
          );

          try {
            // Delete the file
            fs.unlinkSync(imagePath);
          } catch (error) {
            log.error("Error deleting image file:", error);
          }
        }
      }

      // Delete the book image
      if (book.image) {
        // Extract the book image file name
        const bookImageName = path.basename(book.image);

        // Get the file path
        const bookImagePath = path.join(
          __dirname,
          `../../images/bookCover/${bookImageName}`
        );

        try {
          // Delete the file
          fs.unlinkSync(bookImagePath);
        } catch (error) {
          log.error("Error deleting book image file:", error);
        }
      }

      // Delete the associated pages
      await pageRepository.delete(pageIds);

      // Then delete the book
      await bookRepository.remove(book);
      return res.status(200).json({
        success: 1,
        message: "Book and associated pages deleted successfully",
      });
    } catch (error) {
      log.error("Error deleting book:", error);
      return res.status(500).json({
        success: 0,
        message:
          "An error occurred while deleting the book and associated pages",
      });
    }
  },
  downloadStoryAsWord: async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.bookId);
    try {
      const { title, buffer } = await generateWordDoc(bookId);
      res.setHeader("Content-Type", "application/msword");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${title}.docx`
      );
      res.send(buffer);
    } catch (error) {
      console.error("Error downloading Word document:", error);
      return res.status(500).json({
        error: "An error occurred while downloading the Word document",
      });
    }
  },

  downloadStoryAsPDF: async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.bookId);
    try {
      const { title, doc } = await generatePdfDoc(bookId);
      res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);
      doc.pipe(res);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while downloading the PDF" });
    }
  },
  /** ======== Delete Specific page ======== **/

  deletePageHandler: async (req: Request, res: Response) => {
    const pageId = parseInt(req.params.pageId);

    try {
      const pageRepository = AppDataSource.getRepository(Page);
      const page = await pageRepository.findOne({ where: { id: pageId } });

      if (!page) {
        return res.status(404).json({ success: 0, message: "Page not found" });
      }

      // Delete the page image if it exists
      if (page.image) {
        // Extract the image file name
        const imageName = path.basename(page.image);

        // Get the file path
        const imagePath = path.join(
          __dirname,
          `../../images/page/${imageName}`
        );

        try {
          // Delete the file
          fs.unlinkSync(imagePath);
        } catch (error) {
          log.error("Error deleting page image file:", error);
        }
      }

      // Then delete the page
      await pageRepository.remove(page);
      return res.status(200).json({
        success: 1,
        message: "Page deleted successfully",
      });
    } catch (error) {
      log.error("Error deleting page:", error);
      return res.status(500).json({
        success: 0,
        message: "An error occurred while deleting the page",
      });
    }
  },
  sendEmail: async (req: Request, res: Response, emailType: string) => {
    try {
      const { bookId, recipientEmail } = req.body;
      let title, content, subject;

      if (emailType === "PDF") {
        const { title: pdfTitle, doc } = await generatePdfDoc(bookId);
        title = pdfTitle;
        const pdfBuffer = await new Promise((resolve) => {
          let buffers: Buffer[] = [];
          doc.on("data", buffers.push.bind(buffers));
          doc.on("end", () => {
            resolve(new Uint8Array(Buffer.concat(buffers)) as Buffer);
          });
        });
        content = pdfBuffer as Buffer;
        subject = "Your Book's PDF Document is Ready for Download";
      } else if (emailType === "Word") {
        const { title: wordTitle, buffer } = await generateWordDoc(bookId);
        title = wordTitle;
        content = buffer;
        subject = "Your Book's Word Document is Ready for Download";
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: recipientEmail,
        subject: subject,
        text: `We are delighted to share the ${emailType} Version of your storybook with you. You can access it by downloading the Attached ${emailType} Document below. Happy reading!`,
        attachments: [
          {
            filename: `${title}.${emailType}`,
            content: content,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    } catch (error) {
      console.error("Error sending the email:", error);
      res
        .status(500)
        .json({ success: false, message: "Email sending failed." });
    }
  },
  sendBookAsPdf: async (req: Request, res: Response) => {
    await BookController.sendEmail(req, res, "PDF");
  },
  sendBookAsWord: async (req: Request, res: Response) => {
    await BookController.sendEmail(req, res, "Word");
  },
  // ... other methods ...
};

async function savePagesToDatabase(pages: PageData[], bookId: number) {
  const pageRepository = AppDataSource.getRepository(Page);
  const errors: Error[] = [];

  const pageEntities = pages.flatMap((page) => {
    return page.paragraphs;
  });

  const imageUrls = await Promise.all(
    pageEntities.map((paragraph) => generateImage(paragraph))
  );

  const newPages = pageEntities.map(async (paragraph, index) => {
    const imageUrl = imageUrls[index];
    if (!imageUrl) {
      const error = new Error(`Image URL is missing for page ${index + 1}`);
      errors.push(error);
      return null;
    }

    const localImagePath = await downloadPagesImageLocally(imageUrl);

    return {
      paragraph,
      image: localImagePath,
      book: { id: bookId },
    };
  });

  const resolvedPages = await Promise.all(newPages);

  const validNewPages = resolvedPages.filter((page) => page !== null);

  try {
    await pageRepository.save(validNewPages as DeepPartial<Page>[]);
  } catch (err: any) {
    log.error("Error inserting pages into the database:", err);
    errors.push(err);
  }

  if (errors.length > 0) {
    log.error("Errors occurred during page insertion:", errors);
  }
}
