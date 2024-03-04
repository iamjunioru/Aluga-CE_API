import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "./../../shared/middlewares";
import * as yup from "yup";
import multer from "multer"; // Importe o multer
import { ImagesProvider } from "../../providers";
import { server } from '../../server';


interface IParamProps {
  property_Id: string;
}

const upload = multer({ dest: 'uploads/' }); // Configure o multer

export const uploadImageValidation = validation((getSchema) => ({
  query: getSchema<IParamProps>(
    yup.object().shape({
      property_Id: yup.string().required(),
    })
  ),
}));

const uploadImage = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]; // Acesse os arquivos
    const property_Id = req.query['property_Id'];

    if (!property_Id || typeof property_Id !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "O parâmetro 'property_Id' precisa ser informado.",
      });
      return;
    }

    if (!files || files.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Nenhuma imagem foi enviada.",
      });
      return;
    }

    const images = await ImagesProvider.uploadImages(files, property_Id);

    if (!images) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao fazer upload das imagens.");
      return;
    }

    res.status(StatusCodes.CREATED).json({
      message: "Imagens salvas com sucesso.",
      data: images,
    });
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Erro ao fazer upload das imagens.",
      error: error.message,
    });
  }
};

// Aplique o middleware multer antes do manipulador
server.post(
  "/upload",
  upload.array('images'), // Especifique o nome do campo de imagem
  uploadImageValidation,
  uploadImage
);

export { uploadImage };
