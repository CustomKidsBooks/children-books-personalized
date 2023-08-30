import { Request, Response } from "express";
import { hashSync, genSaltSync } from "bcrypt";
import { AppDataSource } from "../db/connect";
import { User } from "../entities/user";
import log from "../logger";

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

  // ... other controller methods ...
};
