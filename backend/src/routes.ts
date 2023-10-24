import { Express } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller";
import { upload } from "./middleware/uploadFile";
const authMiddleware = require("./auth/authCheck");
export default function (app: Express) {
  // create user
  app.post("/api/create_user", UserController.createUser);

  // Fetch pages for the current clicked book route
  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  // Handling POST request to create a new book
  app.post("/api/create_book", BookController.createBook);
  // Handling GET request to fetch all books
  app.get("/api/books", BookController.fetchBooks);

  // Handling GET request to fetch a book with it's related pages
  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  // Handling PUT request to update a book Cover details
  app.put("/api/books/:id", BookController.updateBookHandler);

  // Define a route to update a specific page by ID
  app.put(
    "/api/pages/:pageId",
    upload.single("image"),
    BookController.updatePageHandler
  );

  // Handling DELETE request to delete a book
  app.delete("/api/books/:id", BookController.deleteBookHandler);

  // Handling DELETE request to delete a specific page
  app.delete("/api/pages/:pageId", BookController.deletePageHandler);

  // Handling pdf download
  app.get('/api/download/story/pdf/:bookId', BookController.downloadStoryAsPDF);
  // Handling word download
  app.get('/api/download/story/word/:bookId', BookController.downloadStoryAsWord);

  // Define an API endpoint for sending the book as a PDF
  app.post("/api/sendBookAsPdf/:bookId", BookController.sendBookAsPdf);
  // Define an API endpoint for sending the book as a Word
  app.post("/api/sendBookAsWord/:bookId", BookController.sendBookAsWord);
}
