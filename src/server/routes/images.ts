import { Request, Response, Router } from "express";
import { ensureAuthenticated, upload } from "./../shared/middlewares";
import { ImagesController } from "../controllers/images";

const imagesRouter = Router();

// upload image
imagesRouter.post(
  "/upload",
  ensureAuthenticated,
  upload,
  ImagesController.uploadImage
);

// get images by property id
imagesRouter.get(
  "/images/:id",
  ImagesController.getAllByPropertyValidation,
  ImagesController.getAllByProperty

);

export { imagesRouter };
