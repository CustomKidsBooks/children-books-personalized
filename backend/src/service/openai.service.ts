import { OpenAIApi, Configuration, CreateCompletionRequest } from "openai";
import log from "../logger";

export async function generateBookText(prompt: string): Promise<string> {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const completionRequest: CreateCompletionRequest = {
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt,
  };

  const completion = await openai.createCompletion(completionRequest);

  const generatedText = completion.data.choices[0].text as string;

  return generatedText;
}

export async function generateImage(
  prompt: string
): Promise<string | undefined> {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    const generatedImage = response.data.data[0].url;

    return generatedImage;
  } catch (error) {
    // Handle the error here if needed
    log.error("Error generating image:", error);
    return undefined;
  }
}
