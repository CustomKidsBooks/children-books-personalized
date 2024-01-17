import { Express } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller";
import { upload } from "./middleware/uploadFile";
import validationMW from "./middleware/validationMiddleware";
import { createBookValSchema } from "./validations/createBookVal";
import { fetchBooksVal } from "./validations/fetchBooksVal";
import genericValidationMW from "./middleware/genericValidation";
import { OrderController } from "./controller/order.controller";
import express from "express";

export default function (app: Express) {
  const { authMiddleware } = require("./auth/authCheck");
  const validFetchBookMW = genericValidationMW(fetchBooksVal, "query");

  app.post("/api/create_user", UserController.createUser);

  app.delete("/api/users/:userID", authMiddleware, UserController.deleteUser);

  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  app.post(
    "/api/create_book",
    validationMW(createBookValSchema),
    BookController.createBook
  );

  app.post(
    "/api/create_book/:userID",
    authMiddleware,
    validationMW(createBookValSchema),
    BookController.createBook
  );
  app.post("/api/generateImage", BookController.generateImageForPage);

  app.get("/api/books", validFetchBookMW, BookController.fetchBooks);

  app.get("/api/books/:userID", authMiddleware, BookController.fetchUserBooks);

  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  app.put("/api/books/:id", BookController.updateBookHandler);

  app.put("/api/books/:id/pages", BookController.updateBookPages);

  app.put("/api/pages/:pageId", BookController.updatePageHandler);

  app.delete("/api/books/:id", BookController.deleteBookHandler);

  app.delete("/api/pages/:pageId", BookController.deletePageHandler);

  app.post(
    "/api/download/story/pdf/:bookId",
    BookController.downloadStoryAsPDF
  );

  app.post(
    "/api/download/story/word/:bookId",
    BookController.downloadStoryAsWord
  );

  app.post("/api/sendBookAsPdf/:bookId", BookController.sendBookAsPdf);

  app.post("/api/sendBookAsWord/:bookId", BookController.sendBookAsWord);

  app.get("/api/users/:userID/orders", OrderController.getOrders);
  app.get(
    "/api/users/:userID/orders/:printJobId/status",
    OrderController.getOrderStatus
  );

  app.post(
    "/api/orders/printJobEstimatedCost",
    authMiddleware,
    OrderController.getPrintJobEstimatedCost
  );
  app.post(
    "/api/orders/create-checkout-session",
    authMiddleware,
    OrderController.createCheckoutSession
  );
  app.post(
    "/api/orders/webhook",
    express.raw({ type: "application/json" }),
    OrderController.webHooks
  );
}
