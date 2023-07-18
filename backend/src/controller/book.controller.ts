import { AppDataSource } from "../db/connect";
import { Book } from "../entities/book";
import { Request, Response } from "express";

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
    console.log("Book created successfully!");
  } catch (error) {
    console.error("Error creating book:", error);
  }
}

// Fetch all books
export async function fetchBooksHandler(req: Request, res: Response) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find();
    res.json(books);
    console.log("All books:", books); // Log the books
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ error: "An error occurred while retrieving books" });
  }
}

// Update a book
export async function updateBookHandler(
  id: number,
  title: string,
  desc: string,
  author: string
) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } }); // Pass the ID as a property of FindOneOptions object
    if (book) {
      book.title = title;
      book.desc = desc;
      book.author = author;
      await bookRepository.save(book);
    }
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

// Delete a book
export async function deleteBookHandler(id: number) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.delete(id);
    console.log(`book${id} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}
