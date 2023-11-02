import config from "config";
import cors from "cors";
import express from "express";
import path from "path";
import "reflect-metadata";
import { AppDataSource } from "./db/connect";
import log from "./logger";
import routes from "./routes";

const expressConfig = config.get("express") as {
  port: number;
  host: string;
};

const app = express();
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function initialize() {
  try {
    await AppDataSource.initialize();
    log.info("Database connection established successfully!");
  } catch (error) {
    log.error("Error during database connection initialization:", error);
    throw error;
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
