import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { ReviewsProvider } from "../../providers/reviews";
import { PropertiesProvider } from "../../providers/properties";
import StatusCodes from "http-status-codes";
import { Review } from "../../models";
import * as yup from "yup";

interface IBodyProps extends Omit<Review, "id" | "createdAt" | "updatedAt"> {}

export const createReviewValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      user_Id: yup.string().required(),
      property_Id: yup.string().required(),
      rating: yup.number().required().max(5).min(1),
      comment: yup.string().required(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Review>, res: Response) => {
  try {
    // verify if user_id exists
    const user = await PropertiesProvider.verifyUserExist(req.body.user_Id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: `Usuário com o id ${req.body.user_Id} não encontrado.`
        },
      });
    }

    // verify if property_id exists
    const property = await ReviewsProvider.VerifyPropertyExist(req.body.property_Id);

    if (!property) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: `Propriedade com o id ${req.body.property_Id} não encontrada.`
        },
      });
    }

    const result = await ReviewsProvider.create(req.body);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Erro ao criar avaliação.",
        },
      });

    return res.status(StatusCodes.CREATED).json({
      message: "Avaliação criada com sucesso.",
      data: result.review,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message || "Erro ao criar avaliação.",
        default: "Erro ao criar avaliação.",
      },
    });
  }
}