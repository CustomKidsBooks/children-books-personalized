import { DataSource } from "typeorm";
import { Book } from "../entities/book";
import { Page } from "../entities/page";
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Book, Page, User],
  synchronize: false, // Auto-create or update database schema(true for development only),
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
});
