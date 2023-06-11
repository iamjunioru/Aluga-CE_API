import { validation } from "./../../shared/middlewares";
import { Request, Response } from "express";
import { PropertiesProvider } from "../../providers/properties";
import { Property } from "../../models";
import StatusCodes from "http-status-codes";
import * as yup from "yup";

interface IBodyProps extends Omit<Property, "id" | "createdAt" | "updatedAt"> {}

export const createPropertyValidation = validation((getSchema) => ({
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
}));

export const create = async (req: Request<{}, {}, Property>, res: Response) => {
  try {
    const result = await PropertiesProvider.create(req.body);

    if (!result)
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: "Erro ao criar propriedade.",
        },
      });

    return res.status(StatusCodes.CREATED).json({
      message: "Propriedade criada com sucesso.",
      data: result.property,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: error.message,
        default: "Erro ao criar propriedade.",
      },
    });
  }
};
