import { Express, Request, Response } from "express";
import {
  createBookHandler,
  fetchBooksHandler,
  updateBookHandler,
  deleteBookHandler,
} from "./controller/book.controller";
import { createParagraphHandler } from "./controller/api.controller";

export default function (app: Express) {
  // Handling POST request to create a new book Paragraph
  // POST /api/create_paragraph
  //curl -X POST  http://localhost:5001/api/create_paragraph
  app.post("/api/create_paragraph", createParagraphHandler);

  // Handling POST request to create a new book
  // POST /api/create_book
  /*$ curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Sample Book",
  "desc": "This is a sample book description.",
  "author": "John Doe"
}' http://localhost:5001/api/create_book */

  app.post("/api/create_book", (req: Request, res: Response) => {
    const { title, desc, author } = req.body;
    createBookHandler(title, desc, author);
    res.sendStatus(201);
  });

  // Handling GET request to fetch all books
  // GET /api/books
  //curl http://localhost:5001/api/books
  app.get("/api/books", fetchBooksHandler);

  // Handling PUT request to update a book
  // PUT /api/books/:id
  app.put("/api/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, desc, author } = req.body;
    updateBookHandler(Number(id), title, desc, author);
    res.sendStatus(200);
  });

  // Handling DELETE request to delete a book
  // DELETE /api/books/:id
  //curl -X DELETE http://localhost:5001/api/books/7
  app.delete("/api/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    deleteBookHandler(Number(id));
    res.sendStatus(204);
  });
}
