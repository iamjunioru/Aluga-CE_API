import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ReviewController } from "../controllers";
import { ensureAuthenticated } from "./../shared/middlewares";

const reviewRouter = Router();

reviewRouter.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("OK");
});

// get all reviews from a property
reviewRouter.get(
  "/reviews/:propertyId",
  ReviewController.getAllFromPropertyValidation,
  ReviewController.getAllFromProperty
);

// create a review
reviewRouter.post(
  "/reviews",
  ensureAuthenticated,
  ReviewController.createReviewValidation,
  ReviewController.create
);

// delete a review
reviewRouter.delete(
  "/reviews/:id",
  ensureAuthenticated,
  ReviewController.deleteByIdValidation,
  ReviewController.deleteById
);

export { reviewRouter };