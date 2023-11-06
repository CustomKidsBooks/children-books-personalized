import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { DeepPartial, FindOneOptions, Like } from "typeorm";
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
  createBook: async (req: Request, res: Response) => {
    const { title, ageGroup, subject, characters, lesson, page, privacy } =
      req.body;
    let newBook: Book | undefined;

    try {
      const bookRepository = AppDataSource.getRepository(Book);
      let imageDesc = `for a story book "${title}" for kids age ${ageGroup}`;
      imageDesc += subject ? ` about ${subject}` : "";

      let charactersInfo = "";

      if (characters.length > 0) {
        characters.forEach(
          (character: { name: string; description: string }) => {
            charactersInfo += `, ${character.name}: ${character.description}`;
          }
        );
      }

      imageDesc += charactersInfo;
      const imageUrl = await generateImage(imageDesc);
      const tagDesc = `create a three tags which are 8 characters long based on information below ${imageDesc}`;
      const tags = await generateBookText(tagDesc);

      if (imageUrl) {
        const uploadedImageUrl = await downloadCoverImageLocally(imageUrl);
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
          image: uploadedImageUrl,
        });

        await bookRepository.save(newBook);

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
        const bookContent = await generateBookText(desc);
        const paragraphsPerPage = 1;
        const pages = getPagesFromContent(bookContent, paragraphsPerPage);
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

  fetchBooks: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const search = req.query.search;
      let books;
      let totalPages;

      const bookRepository = AppDataSource.getRepository(Book);
      if (page) {
        const booksAndCount = await bookRepository.findAndCount({
          where: [
            {
              privacy: "public",
              title: Like(`%${search}%`),
            },
            {
              privacy: "public",
              tag: Like(`%${search}%`),
            },
          ],
          skip: (page - 1) * limit,
          take: limit,
        });
        books = booksAndCount[0];
        const count = booksAndCount[1];
        totalPages = Math.ceil(count / limit);
      } else {
        books = await AppDataSource.manager
          .createQueryBuilder(Book, "book")
          .where("book.privacy = :privacy", { privacy: "public" })
          .orderBy("RAND()")
          .take(limit)
          .getMany();
        totalPages = 1;
      }
      res.json({ books, totalPages });
    } catch (error) {
      log.error("Error retrieving books:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving books" });
    }
  },

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

  fetchCoverAndPagesById: async (req: Request, res: Response) => {
    try {
      const bookId = parseInt(req.params.id, 10);
      if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }

      const bookRepository = AppDataSource.getRepository(Book);
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

  updateBookHandler: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, subject, lesson, privacy } = req.body;

    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository.findOne({ where: { id } });

      if (!book) {
        return res.status(404).json({ success: 0, message: "Book not found" });
      }

      const image = req.body.image;

      if (image) {
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

        const newImageName = `${path.basename(image)}`;
        const newImagePath = path.join(
          __dirname,
          `../../images/book_covers/${newImageName}`
        );
        fs.writeFileSync(newImagePath, image, "base64");
        book.image = `images/page/${newImageName}`;
      }

      book.title = title;
      book.subject = subject;
      book.lesson = lesson;
      book.privacy = privacy;

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

  updatePageHandler: async (req: Request, res: Response) => {
    const pageId = parseInt(req.params.pageId);
    const { paragraph } = req.body;

    try {
      const pageRepository = AppDataSource.getRepository(Page);
      const page = await pageRepository.findOne({ where: { id: pageId } });

      if (!page) {
        return res.status(404).json({ success: 0, message: "Page not found" });
      }

      if (req.file) {
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
        page.image = `images/page/${req.file.filename}`;
      }

      if (paragraph) {
        page.paragraph = paragraph;
      }

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

      const pageIds = book.pages.map((page) => page.id);
      const pageRepository = AppDataSource.getRepository(Page);
      const pages = await pageRepository.find({
        where: pageIds.map((id) => ({ id })),
      });

      for (const page of pages) {
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
      }

      if (book.image) {
        const bookImageName = path.basename(book.image);

        const bookImagePath = path.join(
          __dirname,
          `../../images/bookCover/${bookImageName}`
        );

        try {
          fs.unlinkSync(bookImagePath);
        } catch (error) {
          log.error("Error deleting book image file:", error);
        }
      }

      await pageRepository.delete(pageIds);
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

  deletePageHandler: async (req: Request, res: Response) => {
    const pageId = parseInt(req.params.pageId);

    try {
      const pageRepository = AppDataSource.getRepository(Page);
      const page = await pageRepository.findOne({ where: { id: pageId } });

      if (!page) {
        return res.status(404).json({ success: 0, message: "Page not found" });
      }

      if (page.image) {
        const imageName = path.basename(page.image);

        const imagePath = path.join(
          __dirname,
          `../../images/page/${imageName}`
        );

        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          log.error("Error deleting page image file:", error);
        }
      }

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

    const uploadedImageUrl = await downloadPagesImageLocally(imageUrl);

    return {
      paragraph,
      image: uploadedImageUrl,
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
