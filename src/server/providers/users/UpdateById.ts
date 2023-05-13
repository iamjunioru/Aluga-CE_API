import bcrypt from 'bcrypt';
import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponse extends User {
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponseWithoutId extends Omit<UserResponse, "id" | "password"> {}

interface ResponseUpdateById {
  user: UserResponseWithoutId;
}

export const updateById = async (
  id: number,
  user: UserResponse
): Promise<ResponseUpdateById> => {
  
  const hashPassword = await bcrypt.hash(user.password, 10);

  const result = await db.user.update({
    where: {
      id: id,
    },
    data: {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password: hashPassword,
    },
  });

  if (!result) {
    throw new Error(`Erro ao atualizar usuário.`);
  }

  return {
    user: {
      name: result.name,
      email: result.email,
      phone_number: result.phone_number,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  }
};
