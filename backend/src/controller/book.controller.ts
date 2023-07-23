import { AppDataSource } from "../db/connect";
import { Book } from "../entities/book";
import { Request, Response } from "express";
import log from "../logger";

// Create a book
export async function createBookHandler(
  title: string,
  desc: string,
  author: string
) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const newBook = bookRepository.create({ title, desc, author });
    await bookRepository.save(newBook);
    log.info("Book created successfully!");
  } catch (error) {
    log.error("Error creating book:", error);
  }
}

// Fetch all books
export async function fetchBooksHandler(req: Request, res: Response) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find();
    res.json(books);
    log.info("All books:", books); // Log the books
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving books" });
  }
}

// Delete a book
export async function deleteBookHandler(id: number) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.delete(id);
    log.info(`book${id} deleted successfully!`);
  } catch (error) {
    log.error("Error deleting book:", error);
  }
}
