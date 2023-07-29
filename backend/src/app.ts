import express from "express";
import config from "config";
import log from "./logger";
import { AppDataSource } from "./db/connect";
import routes from "./routes";
import "reflect-metadata";
import path from "path";

const expressConfig = config.get("express") as {
  port: number;
  host: string;
};

const app = express();
app.use("/images", express.static(path.join(__dirname, "../images")));
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

async function initialize() {
  try {
    await AppDataSource.initialize(); // Establish the database connection
    log.info("Database connection established successfully!");
  } catch (error) {
    log.error("Error during database connection initialization:", error);
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
    log.error("Error during server startup:", error);
  }
})();
