import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { ReviewsProvider } from "../../providers/reviews";
import StatusCodes from "http-status-codes";
import * as yup from "yup";

interface IQueryProps {
  page?: number;
  limit?: number;
}

interface IParamProps {
  id?: string;
}

export const getAllFromPropertyValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().min(1),
      limit: yup.number().min(1)
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.string(),
    })
  ),
}));

export const getAllFromProperty = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1, limit = 10 } = req.query as IQueryProps;

    const offset = (page - 1) * limit;

    const result = await ReviewsProvider.getAllFromProperty(
      limit as number,
      offset as number,
      req.params.propertyId
    );

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Nenhuma avaliação encontrada.",
        },
      });

    return res.status(StatusCodes.OK).json({
      message: result.total > 0 ? "Avaliações encontradas com sucesso." : "Nenhuma avaliação encontrada.",
      data: result.reviews,
      total: result.total,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
          message: error.message || "Erro ao buscar avaliações.",
          default: "Erro ao buscar avaliações.",
      },
    });
  }
}
