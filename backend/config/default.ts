require("dotenv").config();

export default {
  ChatGpt_key: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  express: {
    port: process.env.PORT ?? 5001,
    host: "localhost",
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
