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

  @Column({ length: 2000 })
  paragraph!: string;

  @Column({ nullable: true, type: "varchar", default: null })
  image!: string;

  @ManyToOne(() => Book, (book) => book.pages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "bookId" }) // Specify the foreign key column name
  book!: Book;
}
