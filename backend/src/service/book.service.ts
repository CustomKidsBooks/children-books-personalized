import axios from "axios";
import fs from "fs";
import { Book } from "../entities/book"; // Import your Book entity or data model
import { EntityManager, DataSource, getRepository } from "typeorm";

import path from "path";
import { AppDataSource } from "../db/connect";
// Function to download the image and save it locally in the Node.js environment
export async function downloadCoverImageLocally(
  imageUrl: string
): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Assuming you want to save the image in a folder named "coverImages"
    const localImagePath = `images/bookCover/${Date.now()}_image.jpg`;

    // Write the image buffer to a local file using fs module
    fs.writeFileSync(localImagePath, imageBuffer);

    return localImagePath;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}
export async function downloadPagesImageLocally(
  imageUrl: string
): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Assuming you want to save the image in a folder named "coverImages"
    const localImagePath = `images/page/${Date.now()}_image.jpg`;

    // Write the image buffer to a local file using fs module
    fs.writeFileSync(localImagePath, imageBuffer);

    return localImagePath;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

export function getPagesFromContent(
  content: string,
  paragraphsPerPage: number
) {
  const paragraphs = content.split("Page");
  const pages = [];

  for (let i = 1; i < paragraphs.length; i += paragraphsPerPage) {
    const pageParagraphs = paragraphs
      .slice(i, i + paragraphsPerPage)
      .map((p) => p.trim());

    if (pageParagraphs.length > 0) {
      const page = {
        pageNumber: Math.floor(i / paragraphsPerPage) + 1,
        paragraphs: pageParagraphs.map((p) => p.replace(/^\d+\s*/, "")), // Remove leading numbers
      };
      pages.push(page); // Add the page to the pages array
    }
  }

  return pages;
}

export async function fetchStoryDataForPDF(id: number) {
  try {
    // Use TypeORM's repository to fetch the book data from your database

    // Use the repository to fetch the book data from your database
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    }

    // In this example, we assume that your Book entity has properties like 'title' and 'content'
    const { title, subject } = book;

    // Return the story data
    return { title, subject };
  } catch (error) {
    console.error("Error fetching story data:", error);
    throw error;
  }
}

export async function fetchStoryDataForWord(id: number) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    }

    // In this example, we assume that your Book entity has properties like 'title' and 'content'
    const { title, subject } = book;

    return { title, subject };
  } catch (error) {
    throw error;
  }
}
export async function createWordDocument(title: string, subject: string) {
  // You can use a library like 'mammoth' or 'docxtemplater' to generate Word documents
  // Here's a basic example using the 'docxtemplater' library (you'll need to install it)

  const Docxtemplater = require("docxtemplater");
  const fs = require("fs");
  const docName = path.basename(title);
  const templatePath = path.join(
    __dirname,
    `../../download/word/${docName}.docx`
  );
  const contentData = {
    title,
    subject,
  };

  const contentBuffer = fs.readFileSync(templatePath);

  const doc = new Docxtemplater(contentBuffer);
  doc.setData(contentData);
  doc.render();

  return doc;
}
