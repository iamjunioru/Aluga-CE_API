import { Request, Response } from "express";
import { PropertiesProvider } from "../../providers/properties";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "./../../shared/middlewares";
import { Property } from "../../models";

interface IBodyProps extends Omit<Property, "id" | "createdAt" | "updatedAt"> {}

interface IParamProps {
  id: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      inscription_number: yup.string().required(),
      type: yup.string().required(),
      description: yup.string().required(),
      rent_price: yup.string().required(),
      cep: yup.string().required(),
      neighborhood: yup.string().required(),
      street_name: yup.string().required(),
      street_number: yup.string().required(),
      total_occupancy: yup.number().required(),
      total_bedrooms: yup.number().required(),
      total_bathrooms: yup.number().required(),
      has_wifi: yup.boolean().required(),
      has_tv: yup.boolean().required(),
      has_air_conditioning: yup.boolean().required(),
      has_washing_machine: yup.boolean().required(),
      has_kitchen: yup.boolean().required(),
      has_suite: yup.boolean().required(),
      has_parking_space: yup.boolean().required(),
      has_pool: yup.boolean().required(),
      has_beach_view: yup.boolean().required(),
      user_Id: yup.string().required(),
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
    const user = await PropertiesProvider.verifyUserExist(req.body.user_Id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: `Usuário com o id ${req.body.user_Id} não encontrado.`
        },
      });
    }

    const result = await PropertiesProvider.updateById(id, req.body);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Propriedade não encontrada.",
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Propriedade atualizada com sucesso.",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: error.message || "Erro ao atualizar propriedade.",
        message: "Erro ao atualizar propriedade.",
      },
    });
  }
};
