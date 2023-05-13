import bcrypt from 'bcrypt';
import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponseWithoutId extends Omit<User, "id" | "password"> {}

interface ResponseUpdateById {
  user: UserResponseWithoutId;
}

export const updateById = async (
  id: string,
  user: User
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
      has_property: user.has_property,
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
      has_property: result.has_property,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  }
};
