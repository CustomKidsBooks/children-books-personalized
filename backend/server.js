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
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

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

// Handling POST request to create a new book
app.post("/create_book", (req, res) => {
  const { title, description, author, page } = req.body; // Extracting data from the request body

  // SQL query to insert a new book into the "BOOKS" table
  let mysqlQuery =
    "INSERT INTO BOOKS_TABLE (TITLE, DESCRIPTION, AUTHOR, PAGE) VALUES (?, ?, ?, ?)";

  // Executing the SQL query using the MySQL connection pool
  pool.query(mysqlQuery, [title, description, author, page], (err, result) => {
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
  });
});

// DELETE request to delete a book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  let mysqlQuery = "DELETE FROM BOOKS_TABLE WHERE ID_BOOK = ?";

  pool.query(mysqlQuery, [bookId], (err, result) => {
    if (err) {
      console.error("Error deleting data from the database:", err);
      res.status(500).json({
        error: "An error occurred while deleting data from the database.",
      });
      return;
    }
    res.status(200).json({ message: "Data deleted successfully." });
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
