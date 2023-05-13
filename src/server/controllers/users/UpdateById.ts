import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";
import { User } from "../../models";
import { UsersProvider } from "../../providers/users";

interface IBodyProps extends Omit<User, "id"> {}

interface IParamProps {
  id: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required().min(6),
      password: yup.string().required().min(6),
      phone_number: yup.string().required(),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required(),
    })
  ),
}));

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.',
        },
      });
    }
    const result = await UsersProvider.updateById(Number(id), req.body);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Erro ao atualizar usuário.",
        },
      });

    return res.status(StatusCodes.OK).json({
      message: "Usuário atualizado com sucesso.",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message || "Erro ao atualizar usuário.",
        default: "Erro ao atualizar usuário.",
      },
    });
  }
};
