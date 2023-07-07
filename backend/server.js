// Importing required modules
require("dotenv").config();
const express = require("express"); // Express framework for building web applications
const app = express(); // Creating an instance of Express application
const mysql = require("mysql2"); // MySQL module for connecting to MySQL database
const cors = require("cors"); // CORS middleware for enabling cross-origin resource sharing

// Configuring middleware
app.use(express.json()); // Parsing JSON request bodies
app.use(cors()); // Enabling CORS for cross-origin requests
// Creating a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
// Handling GET request to fetch data from the database
app.get("/books", (req, res) => {
  let mysqlQuery = "SELECT * FROM BOOKS_TABLE";
  pool.query(mysqlQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      res.status(512).json({
        error: "An error occurred while fetching data from the database.",
      });
      return;
    }
    res.status(200).json(result);
  });
});

/*app.post("/chatgpt_request", async (req, res) => {
  const { description } = req.body;
  console.log(description);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: description,
  });

  const generatedMessage = completion.data.choices[0].text;
  console.log(generatedMessage); // Log the generated message

  res.send(generatedMessage);
}*/

// Handling POST request to create a new book
app.post("/create_book", async (req, res) => {
  const { title, description, author, page, image } = req.body;

  let mysqlBookQuery =
    "INSERT INTO BOOKS_TABLE (TITLE, DESCRIPTION, AUTHOR, PAGE, IMAGE) VALUES (?, ?, ?, ?, ?)";

  pool.query(
    mysqlBookQuery,
    [title, description, author, page, image],
    async (err, bookResult) => {
      if (err) {
        console.error("Error inserting book data into the database:", err);
        res.status(500).json({
          error:
            "An error occurred while inserting book data into the database.",
        });
        return;
      }

      const bookId = bookResult.insertId; // Get the auto-generated ID of the inserted book

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: description,
      });

      const bookContent = completion.data.choices[0].text;
      const paragraphs = bookContent.split("Page");
      const paragraphsPerPage = 1;
      const pages = [];

      for (let i = 1; i < paragraphs.length; i += paragraphsPerPage) {
        const pageParagraphs = paragraphs
          .slice(i, i + paragraphsPerPage)
          .map((p) => p.trim());

        if (pageParagraphs.length > 0) {
          const page = {
            pageNumber: Math.floor(i / paragraphsPerPage) + 1,
            paragraphs: pageParagraphs,
          };
          pages.push(page); // Add the page to the pages array
        }
      }

      // Insert the pages and their paragraphs into the database
      pages.forEach((page) => {
        const { pageNumber, paragraphs } = page;

        paragraphs.forEach((paragraph) => {
          let mysqlPageQuery =
            "INSERT INTO PAGE_TABLE (PAGE_NUM, PARAGRAPH, IMAGE, BOOKS_ID_FK) VALUES (?, ?, ?, ?)";
          const pageN = pageNumber - 1;
          pool.query(
            mysqlPageQuery,
            [pageN, paragraph, image, bookId],
            (err, pageResult) => {
              if (err) {
                console.error(
                  "Error inserting page data into the database:",
                  err
                );
                return;
              }
            }
          );
        });
      });
      res.status(200).json({ message: "Data inserted successfully." });
    }
  );
});

// DELETE request to delete a book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  let mysqlPageQuery = "DELETE FROM PAGE_TABLE WHERE BOOKS_ID_FK = ?";
  let mysqlBookQuery = "DELETE FROM BOOKS_TABLE WHERE ID_BOOK = ?";

  // First, delete the related pages from the PAGE_TABLE
  pool.query(mysqlPageQuery, [bookId], (pageErr, pageResult) => {
    if (pageErr) {
      console.error("Error deleting pages from the database:", pageErr);
      res.status(500).json({
        error: "An error occurred while deleting pages from the database.",
      });
      return;
    }

    // Once the pages are deleted, delete the book from the BOOKS_TABLE
    pool.query(mysqlBookQuery, [bookId], (bookErr, bookResult) => {
      if (bookErr) {
        console.error("Error deleting book from the database:", bookErr);
        res.status(500).json({
          error: "An error occurred while deleting the book from the database.",
        });
        return;
      }
      res.status(200).json({ message: "Data deleted successfully." });
    });
  });
});

// Handling GET request to fetch specific data from the database based on id
app.get("/editBook/:id", (req, res) => {
  const bookId = req.params.id;

  let mysqlQuery = "SELECT * FROM BOOKS_TABLE WHERE ID_BOOK = ?";

  pool.query(mysqlQuery, [bookId], (err, result) => {
    if (err) {
      console.error("Error fetching book details from the database:", err);
      res.status(500).json({
        error:
          "An error occurred while fetching book details from the database.",
      });
      return;
    }
    res.status(200).json(result);
  });
});

// Handling POST request to update existing book
app.post("/update_book/:id", (req, res) => {
  const { title, description, author, page } = req.body;
  const bookId = req.params.id;
  // SQL query to insert a new book into the "BOOKS" table
  let mysqlQuery =
    "UPDATE BOOKS_TABLE SET TITLE=?, DESCRIPTION=?, AUTHOR=?, PAGE=? WHERE ID_BOOK=?";

  // Executing the SQL query using the MySQL connection pool
  pool.query(
    mysqlQuery,
    [title, description, author, page, bookId],
    (err, result) => {
      if (err) {
        // If an error occurred while executing the query
        console.error("Error inserting data into the database:", err);
        res.status(500).json({
          error: "An error occurred while inserting data into the database.",
        });
        return;
      }
      // If the query executed successfully
      res.status(200).json({ message: "Data inserted successfully." });
    }
  );
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
