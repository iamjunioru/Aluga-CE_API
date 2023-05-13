import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponse extends User {
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponseWithoutPassword extends Omit<UserResponse, "password"> {}

interface ResponseGetAll {
  users: UserResponseWithoutPassword[];
  total: number;
}

export const getAll = async (limit: number, offset: number): Promise<ResponseGetAll> => {
  const users = await db.user.findMany({
    take: Number(limit),
    skip: offset,
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await db.user.count();

  return {
    users,
    total,
  };
};
