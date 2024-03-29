import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Page } from "./page";
import { Order } from "./order";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  userID!: string;

  @Column()
  title!: string;

  @Column()
  subject!: string;

  @Column()
  ageGroup!: string;

  @Column({ nullable: true, length: 500 })
  characters!: string;

  @Column({ nullable: true })
  lesson!: string;

  @Column()
  tag!: string;

  @Column({ nullable: true, type: "double", default: null })
  page!: number | null;

  @Column({ nullable: true, type: "varchar", default: null, length: 500 })
  image!: string | null;

  @Column({ type: "enum", enum: ["public", "private"], default: "public" })
  privacy!: "public" | "private";

  @OneToMany(() => Page, (page) => page.book, {
    cascade: ["remove"],
    createForeignKeyConstraints: false,
  })
  pages!: Page[];

  @OneToMany(() => Order, (order) => order.book, {
    cascade: ["remove"],
    createForeignKeyConstraints: false,
  })
  orders!: Order[];
}
