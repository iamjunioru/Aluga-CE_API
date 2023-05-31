import { Request, Response } from "express";
import { db } from "../../utils/db.server";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { JWTService, PasswordCrypto } from "../../shared/services";
import { User } from "../../models";

interface IBodyProps extends Pick<User, "email" | "password"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      password: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as IBodyProps;

  const userExists = await db.user
    .findUnique({
      where: {
        email,
      },
    })
    .then((user) => {
      return user;
    })
    .catch(() => {
      return null;
    });

  if (!userExists) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha incorretos.",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    userExists.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha incorretos.",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: userExists.id });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso",
        },
      });
    }

    const userData = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      phone_number: userExists.phone_number,
      has_property: userExists.has_property,
    };

    return res.status(StatusCodes.OK).json({
      message: "Usuário logado com sucesso.",
      data: {
        user: userData,
        accessToken,
      },
    });
  }
};
