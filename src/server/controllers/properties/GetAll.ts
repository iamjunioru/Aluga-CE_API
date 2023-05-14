import { validation } from "./../../shared/middlewares";
import { Request, Response } from "express";
import { PropertiesProvider } from "../../providers/properties";
import StatusCodes from "http-status-codes";
import * as yup from "yup";

interface IQueryProps {
  page?: number;
  limit?: number;
}

export const getAllPropertiesValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().min(1),
      limit: yup.number().min(1),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  try {
    const { page = 1, limit = 10 } = req.query as IQueryProps;

    const offset = (page - 1) * limit;

    const result = await PropertiesProvider.getAll(limit, offset);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Nenhuma propriedade encontrada.",
        },
      });

    return res.status(StatusCodes.OK).json({
      message: result.total > 0 ? "Propriedade encontrada com sucesso." : "Nenhuma propriedade encontrada.",
      data: result.properties,
      total: result.total,
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
