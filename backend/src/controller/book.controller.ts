import { AppDataSource } from "../db/connect";
import { DeepPartial } from "typeorm";
import { Book } from "../entities/book";
import { Page } from "../entities/page";
import { Request, Response } from "express";
import { generateBookText, generateImage } from "../service/openai.service";
import {
  downloadCoverImageLocally,
  downloadPagesImageLocally,
  getPagesFromContent,
} from "../service/book.service";
import fs from "fs";
import path from "path";
import log from "../logger";

type PageData = {
  pageNumber: number;
  paragraphs: string[];
};

// Create a book
// ...

export async function createBookHandler(
  title: string,
  desc: string,
  author: string,
  page: number,
  image: string
) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const imageDesc = `create an image that has no text on it and for book cover based on this description ${desc}`;
    const imageUrl = await generateImage(imageDesc);

    // Check if imageUrl is not undefined before proceeding
    if (imageUrl) {
      // Download the image and save it locally
      const localImagePath = await downloadCoverImageLocally(imageUrl);

      const newBook = bookRepository.create({
        title,
        desc,
        author,
        page,
        image: localImagePath,
      });

      await bookRepository.save(newBook);
      log.info("Book created successfully!");

      const bookContent = await generateBookText(desc);
      const paragraphsPerPage = 1;
      const pages = getPagesFromContent(bookContent, paragraphsPerPage);
      await savePagesToDatabase(pages, newBook.id);
    } else {
      log.error("Error: Image URL is missing.");
    }
  } catch (error) {
    log.error("Error creating book:", error);
  }
}

async function savePagesToDatabase(pages: PageData[], bookId: number) {
  const pageRepository = AppDataSource.getRepository(Page);

  for (const page of pages) {
    const { pageNumber, paragraphs } = page;

    for (const paragraph of paragraphs) {
      try {
        // Generate the image based on the paragraph
        const imageDesc = `create an image based on this paragraph: ${paragraph}`;
        const imageUrl = await generateImage(imageDesc);

        // Check if imageUrl is not undefined before proceeding
        if (!imageUrl) {
          log.error("Error: Image URL is missing for page", pageNumber);
          continue;
        }

        // Download the image and save it locally
        const localImagePath = await downloadPagesImageLocally(imageUrl);

        const newPage: DeepPartial<Page> = {
          paragraph,
          image: localImagePath,
          book: { id: bookId }, // Use the property 'book' instead of 'bookId'
        };

        await pageRepository.save(newPage);
        log.info("Page", pageNumber, "inserted successfully!");
        log.info("Image downloaded and saved successfully:", localImagePath);
      } catch (err) {
        log.error("Error inserting page data into the database:", err);
      }
    }
  }
}

// Fetch all books
export async function fetchBooksHandler(req: Request, res: Response) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find();
    res.json(books);
  } catch (error) {
    log.error("Error retrieving books:", error);
    res.status(500).json({ error: "An error occurred while retrieving books" });
  }
}

// Fetch a single book
export async function fetchBookHandler(req: Request, res: Response) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const { id } = req.params;
    const book = await bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.pages", "page")
      .where("book.id = :id", { id })
      .getOne();

    if (!book) {
      log.error("Book not found");
      return;
    }

    res.json(book);
  } catch (error) {
    log.error("Error retrieving book:", error);
    res.status(500).json({ error: "An error occurred while retrieving book" });
  }
}

export async function fetchPagesForBookHandler(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const pageRepository = AppDataSource.getRepository(Page);
    const pages = await pageRepository.find({
      where: { book: { id: bookId } },
    });
    res.json(pages);
    log.info("Fetching pages successfully!");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving pages" });
  }
}
// Delete a book
export async function deleteBookHandler(id: number) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.pages", "page")
      .where("book.id = :id", { id })
      .getOne();

    if (!book) {
      log.error("Book not found");
      return;
    }

    if (book.pages.length > 0) {
      // Delete the associated pages and their images first
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
            log.info(`Image file ${imageName} deleted successfully!`);
          } catch (error) {
            log.error("Error deleting image file:", error);
          }
        }
      }

      // Delete the associated pages
      await pageRepository.delete(pageIds);
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
        log.info(`Book image file ${bookImageName} deleted successfully!`);
      } catch (error) {
        log.error("Error deleting book image file:", error);
      }
    }

    // Then delete the book
    await bookRepository.remove(book);
    log.info(`Book ${id} and its associated pages deleted successfully!`);
  } catch (error) {
    log.error("Error deleting book:", error);
  }
}
