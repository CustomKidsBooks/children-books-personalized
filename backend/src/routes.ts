import { Express } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller";
import { upload } from "./middleware/uploadFile";
import validationMW from "./middleware/validationMiddleware";
//import validFetchBookMW from "./middleware/validFetchbookMW";
import {createBookValSchema} from "./validations/createBookVal";
import {fetchBooksVal} from "./validations/fetchBooksVal";
import genericValidationMW from "./middleware/genericValidation";
//import {} from "./validations/";

export default function (app: Express) {
  const { authMiddleware } = require("./auth/authCheck");
  const validFetchBookMW = genericValidationMW(fetchBooksVal, 'query');

  app.post("/api/create_user", UserController.createUser);

  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  app.post("/api/create_book", validationMW(createBookValSchema),  BookController.createBook);

  app.post(
    "/api/create_book/:userID",
    authMiddleware,
    validationMW(createBookValSchema),
    BookController.createBook
  );
  app.get("/api/books", validFetchBookMW, BookController.fetchBooks);
  
  app.get("/api/books/:userID", authMiddleware, BookController.fetchUserBooks);

  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  app.put("/api/books/:id", BookController.updateBookHandler);

  app.put("/api/pages/:pageId", BookController.updatePageHandler);

  app.delete("/api/books/:id", BookController.deleteBookHandler);

  app.delete("/api/pages/:pageId", BookController.deletePageHandler);

  app.get("/api/download/story/pdf/:bookId", BookController.downloadStoryAsPDF);

  app.get(
    "/api/download/story/word/:bookId",
    BookController.downloadStoryAsWord
  );

  app.post("/api/sendBookAsPdf/:bookId", BookController.sendBookAsPdf);

  app.post("/api/sendBookAsWord/:bookId", BookController.sendBookAsWord);
}
