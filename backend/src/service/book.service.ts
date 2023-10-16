import axios from "axios";
import fs from "fs";
import { Book } from "../entities/book"; // Import your Book entity or data model

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  IImageOptions,
  NumberFormat,
  AlignmentType,
  Footer,
  PageNumber,
  Header,
  UnderlineType,
} from "docx";
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
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({
      where: { id },
      relations: ["pages"],
    });

    if (!book) {
      throw new Error("Book not found");
    }
    const { title, characters, lesson, tag, image } = book; 
    const pages = book.pages || [];  
    return { title, characters, lesson, pages, tag, image };
  } catch (error) {
    console.error("Error fetching story data:", error);
    throw error;
  }
}

export async function fetchStoryDataForWord(id: number) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({
      where: { id },
      relations: ["pages"],
    });

    if (!book) {
      throw new Error("Book not found");
    }
    const { title, image} = book;
    
    const paragraphs = book.pages.map((page) => page.paragraph);
    const images = book.pages.map((page) => page.image);
    return { title, paragraphs, image, images };
  } catch (error) {
    throw error;
  }
}
