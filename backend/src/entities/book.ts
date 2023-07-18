import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Page } from "./page";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  desc!: string;

  @Column()
  author!: string;

  @OneToMany(() => Page, (page) => page.book)
  pages!: Page[];
}
