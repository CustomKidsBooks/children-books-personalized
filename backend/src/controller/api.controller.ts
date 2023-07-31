// openai.controller.ts

import { Request, Response } from "express";
import { generateBookText } from "../service/openai.service";
import log from "../logger";

export const createParagraphHandler = async (req: Request, res: Response) => {
  const { subject, character, description, ageGroup } = req.body;
  try {
    const prompt =
    `create a children’s book consisting of subject:${subject}, character:${character}, description:${description}, ageGroup:${ageGroup}, two pages and 2 paragraph per page`;
    const response = await generateBookText(prompt);
    log.info(response);
    res.status(200).json(response);
  } catch (error) {
    log.error("Error creating book:", error);
    res.sendStatus(500);
  }
};
