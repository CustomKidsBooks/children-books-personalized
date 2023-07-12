import { Express, Request, Response, Router } from "express";
import { createBookHandler } from "./controller/api.controller";
export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Handling POST request to create a new book
  //POST /api/create_book
  app.post("/api/create_book", createBookHandler);
}
