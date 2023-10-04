import { Express, Request, Response } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller";
const authMiddleware = require("./auth/authCheck");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const baseUrl = process.env.AUTH0_BASE_URL;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;
import { config } from "dotenv";
config();

if (!baseUrl || !issuerBaseUrl) {
  throw new Error(
    "Please make sure that the file .env.local is in place and populated"
  );
}

if (!audience) {
  console.log(
    "AUTH0_AUDIENCE not set in .env.local. Shutting down API server."
  );
  process.exit(1);
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ["RS256"],
});

export default function (app: Express) {
  app.post("/api/create_user", UserController.createUser); // Use the createUser function from UserController

  // Add a new route to list all users
  app.get("/api/users", checkJwt, UserController.listUsers);
  // Public route for user login
  app.post("/login");
  // Fetch pages for the current clicked book route
  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  // Handling POST request to create a new book

  app.post("/api/create_book", authMiddleware, BookController.createBook);

  // Handling GET request to fetch all books

  app.get("/api/books", BookController.fetchBooks);

  // Handling GET request to fetch a book with related pages

  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  // Handling PUT request to update a book Cover details

  app.put("/api/books/:id", BookController.updateBookHandler);

  // Define a route to update a specific page by ID

  app.put("/api/pages/:id", BookController.updatePageHandler);

  // Handling DELETE request to delete a book
  app.delete("/api/books/:id", BookController.deleteBookHandler);

  // Handling DELETE request to delete a specific page

  app.delete("/api/pages/:pageId", BookController.deletePageHandler);
}
