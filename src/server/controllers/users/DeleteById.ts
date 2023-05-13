import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { UsersProvider } from "../../providers/users";
import { validation } from "./../../shared/middlewares";
import { Prisma } from "@prisma/client";

interface IParamProps {
  id: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required(),
    })
  ),
}));

export const deleteById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.'
        }
      });
    }

    const result = await UsersProvider.deleteById(Number(id));
  
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Usuário não encontrado."
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Usuário deletado com sucesso.",
      data: result
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: error?.meta?.cause === "Record to delete does not exist." ? "Usuário não encontrado." : "Erro ao deletar usuário.",
        },
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: error.message || "Erro ao deletar usuário.",
          message: "Erro ao deletar usuário.",
        },
      });
    }
  }
}