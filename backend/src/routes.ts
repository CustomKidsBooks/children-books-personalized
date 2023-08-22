import { Express } from "express";
import { BookController } from "./controller/book.controller";
import { UserController } from "./controller/user.controller"; // Import your UserController

export default function (app: Express) {
  /*
  curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01", 
  "email": "johndoe@example.com",
  "password": "password"
}' http://localhost:5001/api/create_user
*/
  app.post("/api/create_user", UserController.createUser); // Use the createUser function from UserController

  // Fetch pages for the current clicked book route
  //curl http://localhost:5001/books/12/pages
  app.get("/api/books/:bookId/pages", BookController.fetchPagesForBook);

  // Handling POST request to create a new book
  // POST /api/create_book
  /*$ curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Sample Book",
  "desc": "create a children's book about a beach that has 3 pages and 1 paragraph per page!",
  "author": "John Doe"
}' http://localhost:5001/api/create_book */

  app.post("/api/create_book", BookController.createBook);

  // Handling GET request to fetch all books
  // GET /api/books
  //curl http://localhost:5001/api/books
  app.get("/api/books", BookController.fetchBooks);

  // Handling GET request to fetch a book with it's related pages
  // GET /api/books
  //curl http://localhost:5001/api/book/1
  app.get("/api/book/:id", BookController.fetchCoverAndPagesById);

  // Handling PUT request to update a book Cover details
  /**
curl -X PUT http://localhost:5001/api/books/2 -H "Content-Type: application/json" -d '{
  "title": "The Cat"
}'
 */
  app.put("/api/books/:id", BookController.updateBookHandler);

  // Define a route to update a specific page by ID

  /**
 curl -X PUT http://localhost:5001/api/pages/4 -H "Content-Type: application/json" -d '{
  "paragraph": "Once upon a time just updated 1111, there was a curious little cat named Fluffy. She was always exploring and looking for new adventures."
}'
   */
  app.put("/api/pages/:id", BookController.updatePageHandler);

  // Handling DELETE request to delete a book
  // DELETE /api/books/:id
  //curl -X DELETE http://localhost:5001/api/books/7
  app.delete("/api/books/:id", BookController.deleteBookHandler);

  // Handling DELETE request to delete a specific page
  //curl -X DELETE http://localhost:5001/api/pages/6

  app.delete("/api/pages/:pageId", BookController.deletePageHandler);
}
