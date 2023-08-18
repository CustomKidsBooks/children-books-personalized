import { Express, Request, Response } from "express";
import {
  createBookHandler,
  fetchBooksHandler,
  deleteBookHandler,
  fetchPagesForBookHandler,
  fetchBookHandler,
} from "./controller/book.controller";

export default function (app: Express) {
  app.get("/api/books/:bookId/pages", fetchPagesForBookHandler);

  app.post("/api/create_book", (req: Request, res: Response) => {
    const { title, desc, author, page, image } = req.body;
    createBookHandler(title, desc, author, page, image);
    res.sendStatus(201);
  });

  app.get("/api/books", fetchBooksHandler);

  app.get('/api/books/:id', fetchBookHandler)

  app.delete("/api/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    deleteBookHandler(Number(id));
    res.sendStatus(204);
  });
}
