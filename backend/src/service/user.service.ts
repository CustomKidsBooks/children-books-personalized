import { AppDataSource } from "../db/connect";
import { User } from "../entities/user";
import { FindOneOptions } from "typeorm";

export const UserService = {
  // ... other service methods ...

  createUser: async (data: any) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const newUser = userRepository.create(data);
      await userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserByUserEmail: async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const userOptions: FindOneOptions<User> = {
        where: { email }, // Define the query condition using 'where'
      };
      const user = await userRepository.findOne(userOptions);
      return user || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // ... other service methods ...
};
