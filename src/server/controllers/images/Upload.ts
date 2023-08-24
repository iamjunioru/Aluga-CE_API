import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "./../../shared/middlewares";
import * as yup from "yup";
import { ImagesProvider } from "../../providers";

interface IParamProps {
  property_Id: string;
}

export const uploadImageValidation = validation((getSchema) => ({
  query: getSchema<IParamProps>(
    yup.object().shape({
      property_Id: yup.string().required(),
    })
  ),
}));


const uploadImage = async (req: Request, res: Response) => {
  try {
    const files = req.files;
    const property_Id = req.query['property_Id'];

    if (typeof property_Id !== 'string') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "O parâmetro 'property_Id' precisa ser informado.",
      });
    }

    if (!files || files.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Nenhuma imagem foi enviada.",
      });
    }

    const images = await ImagesProvider.uploadImages(files as Express.Multer.File[], property_Id);

    if (!images) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao fazer upload das imagens.");
    }

    return res.status(StatusCodes.CREATED).json({
      message: "Imagens salvas com sucesso.",
      data: images,
    });
  } catch (error : any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Erro ao fazer upload das imagens.",
      error: error.message,
    });
  }
}

export { uploadImage };