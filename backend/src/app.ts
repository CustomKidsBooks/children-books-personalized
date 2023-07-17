import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes";

const expressConfig = config.get("express") as {
  port: number;
  host: string;
};

const { port, host } = expressConfig;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server is listening at http://${host}:${port}`);
  routes(app);
});
