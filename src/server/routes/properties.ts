import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PropertiesController } from "../controllers";
import { ensureAuthenticated } from "./../shared/middlewares";
// import { upload } from "./../shared/middlewares";

const propertyRouter = Router();

propertyRouter.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("OK");
});

// get all properties
propertyRouter.get(
  "/properties",
  PropertiesController.getAllPropertiesValidation,
  PropertiesController.getAll
);

// get property by id
propertyRouter.get(
  "/properties/:id",
  PropertiesController.getByIdValidation,
  PropertiesController.getById
);

// create property
propertyRouter.post(
  "/properties",
  ensureAuthenticated,
  PropertiesController.createPropertyValidation,
  PropertiesController.create
);

// delete property by id
propertyRouter.delete(
  "/properties/:id",
  ensureAuthenticated,
  PropertiesController.deleteByIdValidation,
  PropertiesController.deleteById
);

export { propertyRouter };
