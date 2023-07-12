import { Request, Response } from "express";
import initializeOpenAI from "../service/openai.service";
export const createBookHandler = async (req: Request, res: Response) => {
  try {
    // Call your OpenAI API using the initializeOpenAI function
    const openai = initializeOpenAI();
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
      prompt: "what is your name",
    });
    const response = completion.data.choices[0].text;
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
