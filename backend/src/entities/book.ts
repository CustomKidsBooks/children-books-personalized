import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Page } from "./page";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  userId!: number;

  @Column()
  title!: string;

  @Column()
  subject!: string;

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

  @OneToMany(() => Page, (page) => page.book, { cascade: ["remove"] })
  pages!: Page[];
}
