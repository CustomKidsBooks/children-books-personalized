// openai.controller.ts

import { Request, Response } from "express";
import { generateBookText } from "../service/openai.service";
import log from "../logger";

export const createParagraphHandler = async (req: Request, res: Response) => {
  try {
    const prompt =
      "create a children’s book consisting of two pages and 1 paragraph per page";
    const response = await generateBookText(prompt);
    log.info(response);
    res.status(200).json(response);
  } catch (error) {
    log.error("Error creating book:", error);
    res.sendStatus(500);
  }
};
