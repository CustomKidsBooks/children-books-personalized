import { Express, Request, Response } from "express";
import {
  createBookHandler,
  fetchBooksHandler,
  deleteBookHandler,
  fetchPagesForBookHandler,
} from "./controller/book.controller";

export default function (app: Express) {
  // Fetch pages for the current clicked book route
  //curl http://localhost:5001/books/12/pages
  app.get("/api/books/:bookId/pages", fetchPagesForBookHandler);

  // Handling POST request to create a new book
  // POST /api/create_book
  /*
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Sample Book",
  "desc": "create a childrens book about a hen that has 3 pages and 1 paragraph per page!",
  "author": "John Doe",
  "page": 3
}' http://localhost:5001/api/create_book

*/

  app.post("/api/create_book", (req: Request, res: Response) => {
    const { title, desc, author, page, image } = req.body;
    createBookHandler(title, desc, author, page, image);
    res.sendStatus(201);
  });

  // Handling GET request to fetch all books
  // GET /api/books
  //curl http://localhost:5001/api/books
  app.get("/api/books", fetchBooksHandler);

  // Handling DELETE request to delete a book
  // DELETE /api/books/:id
  //curl -X DELETE http://localhost:5001/api/books/31
  app.delete("/api/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    deleteBookHandler(Number(id));
    res.sendStatus(204);
  });
}
