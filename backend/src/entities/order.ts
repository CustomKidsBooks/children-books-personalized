import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Book } from "./book";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userID!: string;

  @Column()
  orderTotal!: number;

  @Column()
  paymentStatus!: string;

  @ManyToOne(() => Book, (book) => book.orders, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  book!: Book;
}
