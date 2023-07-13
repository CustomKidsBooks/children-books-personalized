import { OpenAIApi, Configuration, CreateCompletionRequest } from "openai";

export async function generateBookText(prompt: string): Promise<string[]> {
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

  // Split the generated text into paragraphs and filter out empty paragraphs and "Page X" lines
  const paragraphs = generatedText
    .split("\n")
    .filter(
      (paragraph) => paragraph.trim() !== "" && !paragraph.startsWith("Page")
    );

  // If there is only one paragraph, return it as a single-element array
  if (paragraphs.length === 1) {
    return [paragraphs[0]];
  }

  // Return the array of paragraphs
  return paragraphs;
}
