import {
  fetchStoryDataForWord,
  fetchStoryDataForPDF,
} from "./service/book.service";
import {
  Document,
  Packer,
  PageNumber,
  NumberFormat,
  AlignmentType,
  TextRun,
  Footer,
  ImageRun,
  IImageOptions,
  Paragraph,
  UnderlineType,
} from "docx";
import PDFDocument from "pdfkit";
import axios from "axios";

interface pageValues {
  id: number;
  image: string;
  paragraph: string;
}

export async function generatePdfDoc(
  bookTitle: string,
  coverImage: string | null,
  pages: pageValues[]
) {
  const frameX = 30;
  const frameWidth = 550;

  function drawFrameOverlay(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    frameWidth: number,
    frameHeight: number,
    borderColor: string,
    backgroundColor: string,
    opacity: number
  ) {
    doc.save();
    doc.rect(x, y, frameWidth, frameHeight).stroke(borderColor);
    doc.rect(x, y, frameWidth, frameHeight).fill(backgroundColor);
    doc.opacity(opacity);
    doc.restore();
  }

  try {
    // const { title, image, pages } = await fetchStoryDataForPDF(bookId);
    // if (!title) {
    //   throw new Error("Story not found");
    // }

    const doc = new PDFDocument();
    let pageNumber = 1;
    const textConfig = {
      width: 380,
    };
    const imageConfig = {
      width: 350,
    };
    const centerY = doc.page.height / 2;
    doc
      .font("Times-Roman")
      .fillColor("green")
      .fontSize(20)
      .text(bookTitle, { align: "center", underline: true });

    if (coverImage) {
      const response = await axios.get(coverImage, {
        responseType: "arraybuffer",
      });
      const imageBuffer = Buffer.from(response.data);
      const imageWidth = imageConfig.width;
      const imagePadding = 40;
      const imageY = centerY - imageWidth / 2 - imagePadding;

      drawFrameOverlay(
        doc,
        frameX,
        imageY,
        frameWidth,
        imageWidth + 100,
        "gold",
        "orange",
        0.5
      );
      doc.image(imageBuffer, (doc.page.width - imageWidth) / 2, imageY, {
        width: imageWidth,
        height: imageWidth,
      });
      doc.y = imageY + imageWidth + 5;
      doc.fillColor("black").text(`(${pageNumber})`, { align: "center" });
    }

    for (const page of pages) {
      doc.addPage();
      if (page.image) {
        const response = await axios.get(page.image, {
          responseType: "arraybuffer",
        });
        const imageBuffer = Buffer.from(response.data);
        const imageWidth = imageConfig.width;
        const imagePadding = 40;
        const imageY = centerY - imageWidth / 2 - imagePadding;

        drawFrameOverlay(
          doc,
          frameX,
          imageY,
          frameWidth,
          imageWidth + 150,
          "orange",
          "orange",
          0.5
        );
        doc.image(imageBuffer, (doc.page.width - imageWidth) / 2, imageY, {
          width: imageWidth,
          height: imageWidth,
        });
        doc.y = imageY + imageWidth;
      }
      const textPadding = 5;
      const textY = centerY + imageConfig.width / 2 + textPadding;

      drawFrameOverlay(
        doc,
        frameX,
        textY,
        frameWidth,
        120,
        "orange",
        "orange",
        0.5
      );
      const textX = doc.page.width / 2;
      doc
        .font("Times-Roman")
        .fontSize(16)
        .text(page.paragraph, textX - 200, textY, {
          width: textConfig.width,
          align: "center",
        });
      doc.fillColor("black").text(`(${pageNumber + 1})`, { align: "center" });
      pageNumber++;
    }
    doc.end();
    return {
      doc,
    };
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw new Error("An error occurred while downloading the PDF");
  }
}

export async function generateWordDoc(
  bookTitle: string,
  coverImage: string,
  pages: pageValues[]
) {
  try {
    let pageNumber = 1;
    const response = await axios.get(coverImage, {
      responseType: "arraybuffer",
    });
    const imgBuffer = Buffer.from(response.data);
    const imageBuffer = coverImage ? imgBuffer : Buffer.alloc(0);
    const imageOptions: IImageOptions = {
      data: imageBuffer,
      transformation: {
        width: 400,
        height: 400,
      },
    };
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              pageNumbers: {
                start: 1,
                formatType: NumberFormat.DECIMAL,
              },
            },
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      children: ["Page Number: ", PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: bookTitle,
                  bold: true,
                  color: "008000",
                  size: 36,
                  font: "quicksand",
                  underline: {
                    type: UnderlineType.DOUBLE,
                    color: "FF0000",
                  },
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new ImageRun(imageOptions)],
              spacing: {
                before: 100,
                after: 100,
              },
            }),
          ],
        },
      ],
    });

    const paragraphs = pages.map((page) => page.paragraph);
    const images = pages.map((page) => page.image);
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const imageSrc = images[i];
      const response = await axios.get(imageSrc, {
        responseType: "arraybuffer",
      });
      const imageBufferSec = Buffer.from(response.data);
      const imageOptionsSec: IImageOptions = {
        data: imageBufferSec,
        transformation: {
          width: 400,
          height: 400,
        },
      };
      //@ts-ignore
      doc.addSection({
        properties: {
          page: {
            pageNumbers: {
              start: pageNumber + 1,
              formatType: NumberFormat.DECIMAL,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new ImageRun(imageOptionsSec)],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph,
                color: "000000",
                size: 24,
                font: "quicksand",
              }),
            ],
          }),
        ],
      });
      pageNumber++;
    }
    const buffer = await Packer.toBuffer(doc);
    return {
      bookTitle,
      buffer,
    };
  } catch (error) {
    console.error("Error creating Word document:", error);
    throw error;
  }
}
