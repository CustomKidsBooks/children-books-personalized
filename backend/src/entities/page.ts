import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./book";

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  paragraph!: string;

  @Column()
  image!: string;

  @ManyToOne(() => Book, (book) => book.pages)
  @JoinColumn({ name: "bookId" }) // Specify the foreign key column name
  book!: Book;
}
