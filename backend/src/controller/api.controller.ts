// openai.controller.ts

import { Request, Response } from "express";
import { generateBookText } from "../service/openai.service";

export const createParagraphHandler = async (req: Request, res: Response) => {
  try {
    const prompt =
      "create a children’s book consisting of two pages and 1 paragraph per page";
    const response = await generateBookText(prompt);

    // Log the response
    console.log(response);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    // Handle any errors that occur
    console.error("Error creating book:", error);
    res.sendStatus(500);
  }
};
