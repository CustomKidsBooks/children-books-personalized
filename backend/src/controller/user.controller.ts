import { Request, Response } from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { AppDataSource } from "../db/connect";
import { User } from "../entities/user"; // Make sure the path is correct
import dotenv from "dotenv";
dotenv.config();

export const UserController = {
  createUser: async (req: Request, res: Response) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const userRepository = AppDataSource.getRepository(User); // Use getRepository to access User entity

    try {
      const newUser = userRepository.create(body);
      await userRepository.save(newUser);

      return res.status(200).json({
        success: 1,
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },

  listUsers: async (req: Request, res: Response) => {
    try {
      //   const userRepository = AppDataSource.getRepository(User);
      //   const users = await userRepository.find();
      //   res.json(users);
      // } catch (error) {
      //   console.error(error);
      //   res
      //     .status(500)
      //     .json({ error: "An error occured while retrieving users" });
      // }
      // Access the access token from the request headers
      const accessToken = req.headers.authorization?.replace("Bearer ", "");

      // Print the access token to the console
      console.log("Access Token:", accessToken);

      // Now you can use the accessToken as needed in your function

      // For example, if you want to decode the access token (assuming it's a JWT)
      // you can use a library like `jsonwebtoken`:
      // const decodedToken = jwt.decode(accessToken);

      // Perform any other logic you need with the access token here

      // Respond with a success message or user list
      res.json({ message: "User list retrieved successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users" });
    }
    console.log("called the user list!");
  },
  /*
  login: async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: { email: body.email },
      });

      if (!user) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      console.log("Plaintext Password:", body.password);
      console.log("Hashed Password:", user.password);

      const result = compareSync(body.password, user.password);

      if (result) {
        // Create a new object with the desired properties
        const userWithoutPassword = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const secretKey = process.env.JWT_KEY ?? "defaultSecretKey";
        const jsontoken = sign({ result: userWithoutPassword }, secretKey, {
          expiresIn: "1h",
        });

        return res.json({
          success: 1,
          message: "Login successful",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },

  // UserController.ts

  logout: async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        success: 1,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Error during logout",
      });
    }
  },

  */

  // ... other controller methods ...
};
