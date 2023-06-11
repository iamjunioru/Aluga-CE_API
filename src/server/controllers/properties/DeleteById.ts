import { Request, Response } from "express";
import { PropertiesProvider } from "../../providers/properties";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";

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

    const result = await PropertiesProvider.deleteById(id);
  
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Propriedade não encontrada."
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Propriedade deletada com sucesso.",
      data: result
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: error.message || "Erro ao deletar propriedade.",
        message: "Erro ao deletar propriedade.",
      },
    });
  }
};