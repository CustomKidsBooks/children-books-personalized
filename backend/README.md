# children-books backend
# Getting Started 
Install dependencies on the projects backend directory: npm install

Download the MySQL installer, create local database e.g. mydb, use mydb;

Create the .env by using .env.example as a reference: cp .env.example .env
Update the .env file with your correct local information

create your own OPENAI API_KEY

Run the server: npm run dev
Note: nodemon is used, so you should not have to restart your server while coding
Visit http://localhost:5001/...paths to test created apis

# APIs Testing
Handling POST request to create a new book Paragraph
curl -X POST  http://localhost:5001/api/create_paragraph
  
Handling POST request to create a new book
  
curl -X POST -H "Content-Type: application/json" -d 
'{"title": "Book1", "desc": "This is a book description for weekend", "author": "Arp Doe"}' http://localhost:5001/api/create_book

Handling request to fetch all books	 
http://localhost:5001/api/books

Handling POST request to update existing book
curl -X PUT -H "Content-Type: application/json" -d 
'{"title": "New Title", "desc": "Updated description", "author": "New Author"}' http://localhost:5001/api/books/:id

Handling DELETE request to delete a book
curl -X DELETE http://localhost:5001/api/books/7

Check the MySql db folder to see what gets created/updated/deleted