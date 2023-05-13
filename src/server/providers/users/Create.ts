import bcrypt from 'bcrypt';
import { db } from "../../utils/db.server";
import { User } from "../../models";

interface UserResponse extends User {
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponseCreate extends Omit<UserResponse, 
  "password"
> {}

interface ResponseCreate {
  user: UserResponseCreate;
}

export const create = async (user: User): Promise<ResponseCreate> => {
  const userExists = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userExists) {
    throw new Error(`Usuário com o email ${user.email} já existe.`);
  }

  const hashPassword = await bcrypt.hash(user.password, 10);

  const result = await db.user
    .create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashPassword,
        phone_number: user.phone_number,
      },
    })

  if (!result) {
    throw new Error(`Erro ao criar usuário.`);
  }

  return {
    user: {
      id: result.id,
      name: result.name,
      email: result.email,
      phone_number: result.phone_number,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
};
};
