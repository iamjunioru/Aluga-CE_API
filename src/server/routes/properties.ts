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

// create property
propertyRouter.post(
  "/properties",
  ensureAuthenticated,
  PropertiesController.createPropertyValidation,
  PropertiesController.create
);

export { propertyRouter };
