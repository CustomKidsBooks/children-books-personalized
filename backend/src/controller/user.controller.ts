import { Request, Response } from "express";
import { hashSync, genSaltSync } from "bcrypt";
import { AppDataSource } from "../db/connect";
import { User } from "../entities/user";
import { Book } from "../entities/book";
import { Page } from "../entities/page";
import { deleteImageFromFirebase } from "../service/image.service";
import log from "../logger";
import axios from "axios";
import {
  deleteUserFromOauth,
  getApiAccessToken,
} from "../service/auth.service";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export const UserController = {
  createUser: async (req: Request, res: Response) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const userRepository = AppDataSource.getRepository(User);

    try {
      const newUser = userRepository.create(body);
      await userRepository.save(newUser);

      return res.status(200).json({
        success: 1,
        data: newUser,
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const userID = req.params.userID;
    try {
      const access_token = await getApiAccessToken();
      await deleteUserFromOauth(userID, access_token);

      const bookRepository = AppDataSource.getRepository(Book);
      const pageRepository = AppDataSource.getRepository(Page);
      const books = await bookRepository.find({ where: { userID: userID } });

      for (const book of books) {
        const bookId = book.id;
        const coverImageUrl = book.image;
        const directoryPath = "ChildrenBook/CoverImage";
        await deleteImageFromFirebase(coverImageUrl, directoryPath);

        const pages = await AppDataSource.manager
          .createQueryBuilder(Page, "page")
          .where("bookId = :bookId", { bookId: bookId })
          .getMany();

        for (const page of pages) {
          const pageImageUrl = page.image;
          const directoryPath = "ChildrenBook/PagesImage";
          await deleteImageFromFirebase(pageImageUrl, directoryPath);

          await pageRepository.remove(page);
        }
        await bookRepository.remove(book);
      }

      return res.status(200).json({
        success: 1,
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: req.body.bookData.title,
              },
              unit_amount: 10000,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/success-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel-payment`,
      });

      return res.status(200).json({
        url: session,
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },
};
