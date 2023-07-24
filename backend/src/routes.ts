import { Express, Request, Response } from "express";
import {
  createBookHandler,
  fetchBooksHandler,
  deleteBookHandler,
} from "./controller/book.controller";
import { createParagraphHandler } from "./controller/api.controller";

export default function (app: Express) {
  // Handling POST request to create a new book Paragraph
  app.post("/api/create_paragraph", createParagraphHandler);

  // Handling POST request to create a new book
  app.post("/api/create_book", (req: Request, res: Response) => {
    const { title, desc, author } = req.body;
    createBookHandler(title, desc, author);
    res.sendStatus(201);
  });

  // Handling GET request to fetch all books
  app.get("/api/books", fetchBooksHandler);

  // Handling DELETE request to delete a book
  app.delete("/api/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    deleteBookHandler(Number(id));
    res.sendStatus(204);
  });
}
