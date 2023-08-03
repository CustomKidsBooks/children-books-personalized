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

  @Column({ nullable: true, type: "double", default: null })
  page!: number | null; // Use number or null type for the pageNum column

  @Column({ nullable: true, type: "varchar", default: null, length: 500 })
  image!: string | null;

  @OneToMany(() => Page, (page) => page.book, { cascade: ["remove"] })
  pages!: Page[];
}
