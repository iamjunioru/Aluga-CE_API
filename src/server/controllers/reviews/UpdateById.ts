import { ReviewsProvider } from './../../providers/reviews';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";
import { Review } from "../../models";

interface IBodyProps extends Omit<Review, "id" | "createdAt" | "updatedAt"> {}

interface IParamProps {
  id: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      user_Id: yup.string().required(),
      property_Id: yup.string().required(),
      rating: yup.number().required().max(5).min(1),
      comment: yup.string().required(),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.string().required(),
    })
  ),
}));

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.',
        },
      });
    }
    // verify if user_id exists
    const user = await ReviewsProvider.VerifyIfUserExists(req.body.user_Id);

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

    const result = await ReviewsProvider.updateById(id, req.body);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Avaliação não encontrada.",
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Avaliação atualizada com sucesso.",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: error.message || "Erro ao atualizar avaliação.",
        message: "Erro ao atualizar avaliação.",
      },
    });
  }
};
