import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UsersController } from "../controllers";
import { ensureAuthenticated } from "./../shared/middlewares";
// import { upload } from "./../shared/middlewares";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("OK");
});

// // upload image
// userRouter.post(
//   "/upload",
//   ensureAuthenticated,
//   upload,
//   (req: Request, res: Response) => {
//     console.log(req.files);
//     return res.status(StatusCodes.OK).send("OK");
//   }
// );

// get all users
userRouter.get(
  "/users",
  UsersController.getAllUsersValidation,
  UsersController.getAll
);

// get user by id
userRouter.get(
  "/users/:id",
  ensureAuthenticated,
  UsersController.getByIdValidation,
  UsersController.getById
);

// create user
userRouter.post(
  "/users",
  ensureAuthenticated,
  UsersController.createUserValidation,
  UsersController.create
);

// update user by id
userRouter.put(
  "/user/:id",
  ensureAuthenticated,
  UsersController.updateByIdValidation,
  UsersController.updateById
);

// delete user by id
userRouter.delete(
  "/user/:id",
  ensureAuthenticated,
  UsersController.deleteByIdValidation,
  UsersController.deleteById
);

export { userRouter };
