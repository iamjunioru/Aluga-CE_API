import { Request, Response } from "express";
import { PropertiesProvider } from "../../providers/properties";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";

interface IParamProps {
  id: string;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.string().required(),
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

    const result = await PropertiesProvider.getById(id);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Nenhuma propriedade encontrada.",
        },
      });
  
  
    return res.status(StatusCodes.OK).json({
      message: "Propriedade encontrada com sucesso.",
      data: result.property,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message || "Erro ao buscar propriedade.",
        default: "Erro ao buscar propriedade.",
      },
    });
  }
};