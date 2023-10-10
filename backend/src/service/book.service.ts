import axios from "axios";
import fs from "fs";
import { Book } from "../entities/book"; // Import your Book entity or data model
import path from "path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import * as mammoth from "mammoth";
import * as htmlToDocx from "html-docx-js";
// @ts-ignore
import officegen from "officegen";
//const { Document, Packer, Paragraph, TextRun, PageBreak } = require('docx');
// Your code here
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Media,
  ImageRun,
  IImageOptions,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  PageBreak,
  IParagraphOptions,
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
    // Use TypeORM's repository to fetch the book data from your database
    // Use the repository to fetch the book data from your database
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOne({
      where: { id },
      relations: ["pages"],
    });

    if (!book) {
      throw new Error("Book not found");
    }

    // In this example, we assume that your Book entity has properties like 'title' and 'content'
    const { title, subject, characters, lesson, tag, image } = book;
    // Access the 'pages' property to get an array of page objects
    const pages = book.pages || [];
    //console.log("87", book);
    // Return the story data
    return { title, subject, characters, lesson, pages, tag, image };
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

    // In this example, we assume that your Book entity has properties like 'title' and 'content'
    const { title, subject, image } = book;
    // Combine the content of all pages into a single string
    //const content = book.pages.map((page) => page.paragraph).join('\n');
    const paragraphs = book.pages.map((page) => page.paragraph);
    const images = book.pages.map((page) => page.image);
    return { title, subject, paragraphs, image, images };
  } catch (error) {
    throw error;
  }
}
export async function createWordDocument(
  title: string,
  subject: string,
  paragraphs: string[],
  image: string,
  images: string[]
) {
  try {
    const doc = new Document({     
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(title)],
            }),
            new Paragraph({
              children: [new TextRun(subject)],
            }),
          ],
        },
      ],
    });
    let pageNumber = 1;

    // Add an image to the document, it works for all paragraphs on same page
    if (image !== null) {
      const imageBuffer = fs.readFileSync(image); // Read the image file into a buffer
      const imageOptions: IImageOptions = {
        data: imageBuffer, // Provide the image buffer here
        // extension: 'png', // Specify the image file extension
        // width: 200, // Set the width of the image (adjust as needed)
        // height: 200, // Set the height of the image (adjust as needed)
        // title: 'image.jpg',
        transformation: {
          width: 200, // Set the width of the image (adjust as needed)
          height: 200, // Set the height of the image (adjust as needed)
        },
      };

      // const imageBase64 = imageBuffer.toString('base64'); // Convert the buffer to base64
      // const dataUri = `data:image/png;base64,${imageBase64}`; // Create a data URI
      // @ts-ignore
      doc.addSection({
        properties: {},
        children: [
          new Paragraph({
            children: [new ImageRun(imageOptions)],
          }), // Specify the image file name here
        ],
      });
    } else {
      // `image` is null, handle it accordingly
      console.error("No image provided");
      // Handle the absence of an image, such as providing a default image or an error message
    }

    // Add paragraphs and images on separate pages
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const imageSrc = images[i];

      // Add the paragraph
      // Add the image if available
      if (imageSrc) {
        const imageBuffer = fs.readFileSync(imageSrc);
        const imageOptions: IImageOptions = {
          data: imageBuffer,
          transformation: {
            width: 200, // Set the width of the image (adjust as needed)
            height: 200, // Set the height of the image (adjust as needed)
          },
        };
        // @ts-ignore
        doc.addSection({
          properties: {},
          children: [
            new Paragraph({
              children: [new ImageRun(imageOptions)],
            }),
          ],
        });
      }
      // @ts-ignore
      doc.addSection({
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(paragraph)],
          }),
        ],
      });
    }
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error) {
    console.error("Error creating Word document:", error);
    throw error;
  }
}
      // Add the image
      //  if (image !== null) {
      //   const imageBuffer = fs.readFileSync(image);
      //   const imageRun = new Media({
      //     data: imageBuffer,
      //     type: Media.MediaType.PICTURE,
      //     transformation: {
      //       width: 300, // Set the width of the image (adjust as needed)
      //       height: 300, // Set the height of the image (adjust as needed)
      //     },
      //     floating: {
      //       horizontalPosition: {
      //         align: HorizontalPositionAlign.CENTER,
      //       },
      //       verticalPosition: {
      //         align: VerticalPositionAlign.CENTER,
      //       },
      //     },
      //   });

      //   //const imageRun = new Media(imageOptions);
      //   const imageParagraph = new Paragraph({
      //     children: [imageRun],
      //   });

      //   doc.addSection({
      //     properties: {},
      //     children: [
      //       new Paragraph({
      //         children: [new TextRun("Image:")],
      //       }),
      //       imageParagraph,
      //     ],
      //   });
      // } else {
      //   // Handle the absence of an image, such as providing a default image or an error message
      //   console.error("No image provided");
      // }
    
    
// Add paragraphs on separate pages
// paragraphs.forEach((paragraph, index) => {
//   if (index > 0) {
//     // Add a page break after the first paragraph
//     // @ts-ignore
//     doc.createP().addRun(new TextRun().break());
//   }
//   // @ts-ignore
//   doc.createP().addRun(new TextRun(paragraph));
// });
// Create a section for each paragraph
// paragraphs.forEach((paragraph) => {
//   doc.createP({ children: [new TextRun(paragraph)] }); // Paragraph on each page
//   doc.createP().pageBreak(); // Page break between pages
// });
// Add paragraphs from the 'paragraphs' array
// paragraphs.forEach((paragraph) => {
//   doc.addParagraph(new Paragraph({
//     children: [new TextRun(paragraph)],
//   }));
// });
// Create a new instance of a Word document
// const doc = new Document({
// // Add a title and subject to the first page
// sections: [
//   {
//     properties: {},
//     children: [
//       new Paragraph({
//         children: [
//           new TextRun(title),
//         ],
//       }),
//       new Paragraph({
//         children: [
//           new TextRun(subject),
//         ],
//       }),
//     ],
//   },
// ],
//});
//const pages = content.split('\n\n'); // Assuming you have paragraphs separated by two newline characters

// pages.forEach((page, index) => {
//   const contentParagraph = new Paragraph();
//   contentParagraph.addRun(new TextRun(page));
//   doc.addParagraph(contentParagraph);
//   doc.addParagraph(new Paragraph(page));
//   // Add a page break after all paragraphs except the last one
//   if (index < pages.length - 1) {
//     doc.addParagraph(new Paragraph().pageBreak());
//   }
// pages.forEach((page, index) => {
//   const contentParagraph = new Paragraph();
//   contentParagraph.addRun(new TextRun(page));
//   doc.addParagraph(contentParagraph);

//   // Add a page break after all paragraphs except the last one
//   if (index < pages.length - 1) {
//     doc.createP();
//   }
// });
// // Create a new instance of a Word document
// const doc = new Document();

// // Add a title and subject as paragraphs
// doc.createP(title);
// doc.createP(subject);

// const pages = content.split('\n\n'); // Assuming you have paragraphs separated by two newline characters

// pages.forEach((page, index) => {
//   doc.createP(page);

//   // Add a page break after all paragraphs except the last one
//   if (index < pages.length - 1) {
//     doc.createP().pageBreak();
//   }
// });

// Create a buffer to hold the Word document

// export async function createWordDocument(title: string, subject: string, content: string) {
//   try {
//     // Create a new instance of a Word document
//     const doc = new Document();

//     // Add a title and subject to the first page
//     doc.addSection({
//       properties: {},
//       children: [
//         new Paragraph({
//           children: [
//             new TextRun(title),
//           ],
//         }),
//         new Paragraph({
//           children: [
//             new TextRun(subject),
//           ],
//         }),
//       ],
//     });

//     // Split content into pages and add a page break between them
//     const pages = content.split('\n\n'); // Assuming you have paragraphs separated by two newline characters

//     pages.forEach((page, index) => {
//       doc.addSection({
//         properties: {},
//         children: [
//           new Paragraph({
//             children: [
//               new TextRun(page),
//             ],
//           }),
//         ],
//       });

//       // Add a page break after all pages except the last one
//       if (index < pages.length - 1) {
//         doc.addSection({
//           properties: {
//             page: {
//               size: {
//                 width: 12240, // Standard page width
//                 height: 15840, // Standard page height
//               },
//               margin: {
//                 top: 1440, // 1-inch top margin
//                 right: 1440, // 1-inch right margin
//                 bottom: 1440, // 1-inch bottom margin
//                 left: 1440, // 1-inch left margin
//               },
//             },
//           },
//           children: [
//             new Paragraph({
//               children: [
//                 new TextRun(''), // This is an empty paragraph to create a page break
//               ],
//             }),
//           ],
//         });
//       }
//     });

//     // Create a buffer to hold the Word document
//     const buffer = await Packer.toBuffer(doc);

//     return buffer;
//   } catch (error) {
//     console.error("Error creating Word document:", error);
//     throw error;
//   }
// }
export async function created3WordDocument(
  title: string,
  subject: string,
  content: string
) {
  try {
    // Create a new instance of a Word document with options
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(title)],
            }),
            new Paragraph({
              children: [new TextRun(subject)],
            }),
          ],
        },
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(content)],
            }),
          ],
        },
      ],
    });

    // Create a buffer to hold the Word document
    const buffer = await Packer.toBuffer(doc);

    return buffer;
  } catch (error) {
    console.error("Error creating Word document:", error);
    throw error;
  }
}
// export async function createffWordDocument(title: string, subject: string, content: string) {
//   try {
//     // Create a new instance of a Word document
//     const doc = new Document();

//     // Add a title and subject to the document
//     doc.addSection({
//       properties: {},
//       children: [
//         new Paragraph({
//           children: [
//             new TextRun(title).bold(),
//           ],
//         }),
//         new Paragraph({
//           children: [
//             new TextRun(subject),
//           ],
//         }),
//       ],
//     });

//     // Add content from the database to the document
//     doc.addSection({
//       properties: {},
//       children: [
//         new Paragraph({
//           children: [
//             new TextRun(content),
//           ],
//         }),
//       ],
//     });

//     // Create a buffer to hold the Word document
//     const buffer = await Packer.toBuffer(doc);

//     return buffer;
//   } catch (error) {
//     console.error("Error creating Word document:", error);
//     throw error;
//   }
// }
export async function createdddddWordDocument(
  title: string,
  subject: string,
  content: string
) {
  // You can use a library like 'mammoth' or 'docxtemplater' to generate Word documents
  // Here's a basic example using the 'docxtemplater' library (you'll need to install it)

  // const Docxtemplater = require("docxtemplater");
  // const PizZip = require("pizzip");
  //const fs = require("fs");
  // const docName = path.basename(title);
  // const templatePath = path.join(
  //   __dirname,
  //   `../../download/word/${docName}.docx`
  // );
  //  // Write the buffer to a local file using fs module
  //  fs.writeFileSync(templatePath, docName);
  // const contentData = {
  //   title,
  //   subject,
  // };
  // // Load the docx file as binary content
  // const contentBuffer = fs.readFileSync(templatePath);
  // const zip = new PizZip(contentBuffer);

  // const doc = new Docxtemplater(zip, contentBuffer);
  // doc.loadZip(zip);
  // doc.setData(contentData);
  // doc.render();

  // return doc;
  try {
    const contentBuffer = fs.readFileSync(
      path.join(__dirname, `../../download/word/template.docx`)
    );

    // const doc = new Docxtemplater(zip, {
    //   paragraphLoop: true,
    //   linebreaks: true,
    // });
    // Set the data for the template
    const data = {
      title,
      subject,
      content,
    }; // Render the template with the data
    // doc.setData(data);
    // doc.render();
    // // Generate the Word document buffer
    // const buf = doc.getZip().generate({
    //   type: "nodebuffer",
    //});

    //return buf;
  } catch (error) {
    console.error("Error creating Word document:", error);
    throw error;
  }
}
// Function to generate a Word document
export async function createdWordDocument(
  title: string,
  subject: string,
  paragraphs: string[],
  image: string,
  images: string[]
) {
  try {
    // Retrieve the story content and other necessary data from the database or wherever it's stored
    // Load the Word template using PizZip
    const templateContent = fs.readFileSync("template.docx", "binary");
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    // Prepare the data
    const data = {
      title,
      subject,
      paragraphs,
      images,
    };

    // Set the data in the template
    doc.setData(data);

    // Replace the image placeholders with actual images
    for (let i = 0; i < paragraphs.length; i++) {
      const imagePlaceholder = `{image_${i}}`; // Placeholder in the template
      const imageData = images[i]; // Base64-encoded image string from the database

      if (imageData) {
        // Define a custom module to replace the image placeholder with the actual image
        const imageModule = {
          [imagePlaceholder]: `data:image/jpeg;base64,${imageData}`,
        };

        // Add the custom module to docxtemplater
        doc.attachModule(imageModule);

        // Replace the image placeholder with the custom module
        // doc.replaceImage(imagePlaceholder, (params) => {
        //   return {
        //     data: params.module[imagePlaceholder],
        //     width: 200,
        //     height: 200,
        //   };
        // });
      }
    }
    // Render the document
    doc.render();
    // Generate the output document
    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    // Set response headers for downloading the Word document
    return buffer;
  } catch (error) {
    console.error("Error generating Word document:", error);
  }
}
export async function create5WordDocument(
  title: string,
  subject: string,
  paragraphs: string[],
  image: string,
  images: string[]
) {
  try {
    // Load the Word template using PizZip
    const templateContent = fs.readFileSync(
      path.join(__dirname, `../../download/word/template.docx`)
    );
    // Replace placeholders with actual content using mammoth
    const { value } = await mammoth.convertToHtml({
      arrayBuffer: Buffer.from(templateContent),
    });
    // Replace placeholders with actual content in the HTML
    const replacedHtml = value
      .replace("{{title}}", title)
      .replace("{{subject}}", subject);

    // You can replace other placeholders in 'replacedHtml' as needed.
    // Convert HTML to Word document using html-docx-js
    const docxBuffer = htmlToDocx.asBlob(replacedHtml);

    // Return the generated Word document
    return docxBuffer;
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
}
// const zip = new PizZip(templateContent);
// const doc = new Docxtemplater();
// doc.loadZip(zip);

// // Prepare the data
// const data = {
//   title,
//   subject,
//   paragraphs,
//   images
// };

// // Set the data in the template
// doc.setData(data);

// // Replace the image placeholders with actual images
// for (let i = 0; i < paragraphs.length; i++) {
//   const imagePlaceholder = `{image_${i}}`; // Placeholder in the template
//   const imageData = images[i]; // Base64-encoded image string from the database

//   if (imageData) {
//     // Define a custom module to replace the image placeholder with the actual image
//     const imageModule = {
//       [imagePlaceholder]: `data:image/jpeg;base64,${imageData}`,
//     };

//     // Add the custom module to docxtemplater
//     doc.attachModule(imageModule);

//     // Replace the image placeholder with the custom module
//     doc.replaceImage(imagePlaceholder, (params) => {
//       return { data: params.module[imagePlaceholder], width: 200, height: 200 };
//     });
//   }
// }
// // Render the document
// doc.render();
// // Generate the output document
// const buffer = doc.getZip().generate({ type: "nodebuffer" });
// // Return the generated Word document
// return buffer;
// } catch (error) {
//   console.error("Error generating Word document:", error);
//   throw error;
// }
export async function createdontWordDocument(
  title: string,
  subject: string,
  paragraphs: string[],
  image: string,
  images: string[]
): Promise<Buffer> {
  try {
    const docx = officegen("docx");
    console.log("docx", docx);
     // Create a new paragraph for the title and subject
     const titleParagraph = docx.createP();
     titleParagraph.addText(title, {
       bold: true,
       font_face: 'Arial',
       font_size: 16,
     });
     const subjectParagraph = docx.createP();
     subjectParagraph.addText(subject, { font_face: 'Arial', font_size: 14 });
 
     // Add an image to the document if provided
     if (image !== null) {
       const imageBuffer = fs.readFileSync(image);
       const imageWidth = 200; // Adjust the width as needed
       const imageHeight = 200; // Adjust the height as needed
 
       // Specify the X and Y coordinates for positioning the image
       const imageX = 100; // Adjust X-coordinate as needed
       const imageY = 100; // Adjust Y-coordinate as needed
 
       docx.createP().addImage(imageBuffer, {
         x: imageX,
         y: imageY,
         width: imageWidth,
         height: imageHeight,
       });
     }
 
     // Add paragraphs on separate pages
     for (const paragraph of paragraphs) {
       docx.createP().addText(paragraph, { font_face: 'Arial', font_size: 12 });
       docx.putPageBreak(); // Add a page break after each paragraph
     }
     return await new Promise<Buffer>((resolve, reject) => {
      const buffers: Buffer[] = [];
      
      docx.on('error', reject);
      
      // Listen to the 'data' event to collect data chunks
      docx.on('data', (chunk: Buffer) => {
        buffers.push(chunk);
      });
    
      // Listen to the 'end' event to properly end the document
      docx.on('end', () => {
        try {
          const resultBuffer = Buffer.concat(buffers);
          resolve(resultBuffer);
        } catch (error) {
          reject(error);
        }
      });
    
      // Generate the document
      docx.generate();
    });
    
    //  return await new Promise<Buffer>((resolve, reject) => {
    //    const buffers: Buffer[] = [];
    //    // Listen to the 'finalize' event to properly end the document
    //    docx.on('finalize', () => {
    //      try {
    //        const resultBuffer = Buffer.concat(buffers);
    //        resolve(resultBuffer);
    //      } catch (error) {
    //        reject(error);
    //      }
    //    });
 
    //    docx.on('error', reject);
 
    //    // Listen to the 'data' event to collect data chunks
    //    docx.on('data', (chunk: Buffer) => {
    //      buffers.push(chunk);
    //    });
 
    //    // Generate the document
    //    docx.generate();
    //  });
   } catch (error) {
     throw error;
   }
 }
    // Create a new paragraph for the title and subject
//     const titleParagraph = docx.createP();
//     titleParagraph.addText(title, {
//       bold: true,
//       font_face: "Arial",
//       font_size: 16,
//     });
//     const subjectParagraph = docx.createP();
//     subjectParagraph.addText(subject, { font_face: "Arial", font_size: 14 });

//     // Add an image to the document if provided
//     // Add an image to the document if provided
//     if (image !== null) {
//       const imageBuffer = fs.readFileSync(image);
//       const imageWidth = 200; // Adjust the width as needed
//       const imageHeight = 200; // Adjust the height as needed

//       // Specify the X and Y coordinates for positioning the image
//       const imageX = 100; // Adjust X-coordinate as needed
//       const imageY = 100; // Adjust Y-coordinate as needed

//       docx.createP().addImage(imageBuffer, {
//         x: imageX,
//         y: imageY,
//         width: imageWidth,
//         height: imageHeight,
//       });
//     }

//     // Add paragraphs on separate pages
//     for (const paragraph of paragraphs) {
//       docx.createP().addText(paragraph, { font_face: "Arial", font_size: 12 });
//       docx.putPageBreak(); // Add a page break after each paragraph
//     }

//     return await new Promise<Buffer>((resolve, reject) => {
//       const buffer: Buffer[] = [];
//       docx.on("data", (chunk: Buffer) => buffer.push(chunk));
//       docx.on("end", () => {
//         const resultBuffer = Buffer.concat(buffer);
//         resolve(resultBuffer);
//       });
//       docx.on("error", reject);
      
//     });
//   } catch (error) {
//     throw error;
//   }
// }

//     // Create a new paragraph for the title and subject
//     const titleParagraph = docx.createP();
//     titleParagraph.addText(title, { bold: true, font_face: 'Arial', font_size: 16 });
//     const subjectParagraph = docx.createP();
//     subjectParagraph.addText(subject, { font_face: 'Arial', font_size: 14 });

//     // Add images to the document
//     imagePaths.forEach((imagePath) => {
//       if (fs.existsSync(imagePath)) {
//         const image = docx.createP();
//         image.addImage(imagePath); // Add the image using its local file path
//       } else {
//         console.error(`Image not found: ${imagePath}`);
//       }
//     });

//     // Add paragraphs on separate pages
//     paragraphs.forEach((paragraph) => {
//       const paragraphPageBreak = docx.createP();
//       paragraphPageBreak.pageBreak();
//       const paragraphContent = docx.createP();
//       paragraphContent.addText(paragraph, { font_face: 'Arial', font_size: 12 });
//     });

//     const buffer = await new Promise<Buffer>((resolve, reject) => {
//       const stream = fs.createWriteStream('document.docx');
//       docx.generate(stream);
//       stream.on('finish', () => {
//         resolve(fs.readFileSync('document.docx'));
//       });
//       stream.on('error', reject);
//     });

//     return buffer;
//   } catch (error) {
//     console.error("Error creating Word document:", error);
//     throw error;
//   }
// }
