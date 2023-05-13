import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponse extends User {
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponseWithoutPassword extends Omit<UserResponse, "password"> {}

interface ResponseDeleteById {
  user: UserResponseWithoutPassword;
}

export const deleteById = async (id: string): Promise<ResponseDeleteById> => {
  const user = await db.user.delete({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error(`Usuário com o id ${id} não encontrado.`);
  }

  return {
    user,
  };
};
