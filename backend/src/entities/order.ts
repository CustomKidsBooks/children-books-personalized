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

  @Column({ type: "datetime", default: () => "NOW()" })
  date!: string;

  @Column()
  userID!: string;

  @Column()
  coverUrl!: string;

  @Column()
  interiorUrl!: string;

  @Column()
  podPackageId!: string;

  @Column()
  orderTotal!: number;

  @Column()
  paymentStatus!: string;

  @Column()
  printJobId!: number;

  @ManyToOne(() => Book, (book) => book.orders, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  book!: Book;
}
