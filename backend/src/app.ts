import express from "express";
import config from "config";
import log from "./logger";
import { AppDataSource } from "./db/connect";
import routes from "./routes";
import "reflect-metadata";

const expressConfig = config.get("express") as {
  port: number;
  host: string;
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function initialize() {
  try {
    await AppDataSource.initialize(); // Establish the database connection
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Error during database connection initialization:", error);
    throw error; // Rethrow the error to be caught in the main catch block
  }
}

async function startServer() {
  const { port, host } = expressConfig;
  app.listen(port, host);
  log.info(`Server is listening at http://${host}:${port}`);
  routes(app);
}

(async () => {
  try {
    await initialize();
    await startServer();
  } catch (error) {
    console.error("Error during server startup:", error);
  }
})();
