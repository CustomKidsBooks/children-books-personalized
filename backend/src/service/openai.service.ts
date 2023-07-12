import { Configuration, OpenAIApi } from "openai";

const initializeOpenAI = (): OpenAIApi => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return new OpenAIApi(config);
};

export default initializeOpenAI;
