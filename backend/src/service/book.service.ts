import axios from "axios";
import fs from "fs";
import { Book } from "../entities/book";
import { AppDataSource } from "../db/connect";

export async function downloadCoverImageLocally(
  imageUrl: string
): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    const localImagePath = `images/bookCover/${Date.now()}_image.jpg`;
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
    const localImagePath = `images/page/${Date.now()}_image.jpg`;
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
        paragraphs: pageParagraphs.map((p) => p.replace(/^\d+\s*/, "")),
      };
      pages.push(page);
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
    const { title, image } = book;
    const pages = book.pages || [];
    return { title, pages, image };
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
    const { title, image } = book;
    if (image !== null) {
      const paragraphs = book.pages.map((page) => page.paragraph);
      const images = book.pages.map((page) => page.image);
      return { title, paragraphs, image, images };
    } else {
      console.error("No image provided");
    }
  } catch (error) {
    console.error("Error downloading Word document:", error);
    throw error;
  }
}
