import { Express } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller";
import { upload } from "./middleware/uploadFile";

export default function (app: Express) {
  const authMiddleware = require("./auth/authCheck");

  // create user
  app.post("/api/create_user", UserController.createUser);

  // Fetch pages for the current clicked book route
  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  // Handling POST request to create a new book
  app.post("/api/create_book", BookController.createBook);

  // Handling GET request to fetch all books
  app.get("/api/books", BookController.fetchBooks);

  // TODO: addding user books route, 

  // Handling GET request to fetch a book with it's related pages
  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  // Handling PUT request to update a book Cover details
  app.put("/api/books/:id", BookController.updateBookHandler);

  // Define a route to update a specific page by ID
  app.put(
    "/api/pages/:pageId",
    // formMiddleWare,
    upload.single("image"),
    BookController.updatePageHandler
  );

  // Handling DELETE request to delete a book
  app.delete("/api/books/:id", BookController.deleteBookHandler);

  // Handling DELETE request to delete a specific page
  app.delete("/api/pages/:pageId", BookController.deletePageHandler);
}
