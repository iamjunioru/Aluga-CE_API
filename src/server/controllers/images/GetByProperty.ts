import { ImagesProvider } from './../../providers/images';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";
import { ReviewsProvider } from '../../providers';

interface IParamProps {
  id: string;
}

export const getAllByPropertyValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.string().required(),
    })
  ),
}));

export const getAllByProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.',
        },
      });
    }

    // verify if property_id exists
    const property = await ReviewsProvider.VerifyPropertyExist(id);

    if (!property) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: `Propriedade com o id ${req.body.property_Id} não encontrada.`
        },
      });
    }

    const result = await ImagesProvider.getAllByProperty(id);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Nenhuma imagem associada a essa propriedade encontrada.",
        },
      });
  
  
    return res.status(StatusCodes.OK).json({
      message: "Imagens encontradas com sucesso.",
      data: result.Image,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message || "Erro ao buscar imagens de uma propriedade.",
        default: "Erro ao buscar imagens de uma propriedade.",
      },
    });
  }
};