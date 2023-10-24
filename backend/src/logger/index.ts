import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DDTHH:mm:ssZ" }),
    format.printf(({ timestamp, message }) => `${timestamp} ${message}`)
  ),
  transports: [new transports.Console()],
});

export default logger;
