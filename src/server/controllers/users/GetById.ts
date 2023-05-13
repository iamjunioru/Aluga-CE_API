import { Request, Response } from "express";
import { UsersProvider } from "../../providers/users";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";

interface IParamProps {
  id: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required(),
    })
  ),
}));

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.',
        },
      });
    }

    const result = await UsersProvider.getById(Number(id));

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Nenhum usuário encontrado.",
        },
      });
  
  
    return res.status(StatusCodes.OK).json({
      message: "Usuário encontrado com sucesso.",
      data: result.user,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message || "Erro ao buscar usuário.",
        default: "Erro ao buscar usuário.",
      },
    });
  }
};
