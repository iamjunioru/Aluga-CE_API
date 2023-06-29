import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ReviewsProvider } from './../../providers/reviews';
import * as yup from "yup";
import { validation } from "./../../shared/middlewares";
import { Prisma } from "@prisma/client";

interface IParamProps {
  id: string;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.string().required(),
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

    const result = await ReviewsProvider.deleteById(id);
  
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Avaliação não encontrado."
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Avaliação deletada com sucesso.",
      data: result
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: error?.meta?.cause === "Record to delete does not exist." ? "Avaliação não encontrada." : "Erro ao deletar avaliação.",
        },
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: error.message || "Erro ao deletar avaliação.",
          message: "Erro ao deletar avaliação.",
        },
      });
    }
  }
}