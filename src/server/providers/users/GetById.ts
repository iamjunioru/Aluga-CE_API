import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponseWithoutPassword extends Omit<User, "password"> {}

interface ResponseGetById {
  user: UserResponseWithoutPassword;
}

export const getById = async (id: string): Promise<ResponseGetById> => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      has_property: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error(`Usuário com o id ${id} não encontrado.`);
  }

  return {
    user,
  };
};
