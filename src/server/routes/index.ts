import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UsersController, AuthController } from "../controllers";
import { ensureAuthenticated } from "./../shared/middlewares";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send("OK");
});

// get all users
router.get(
  "/users",
  UsersController.getAllUsersValidation,
  UsersController.getAll
);

// get user by id
router.get(
  "/users/:id",
  ensureAuthenticated,
  UsersController.getByIdValidation,
  UsersController.getById
);

// create user
router.post(
  "/users",
  ensureAuthenticated,
  UsersController.createUserValidation,
  UsersController.create
);

// update user by id
router.put(
  "/user/:id",
  ensureAuthenticated,
  UsersController.updateByIdValidation,
  UsersController.updateById
);

// delete user by id
router.delete(
  "/user/:id",
  ensureAuthenticated, 
  UsersController.deleteByIdValidation,
  UsersController.deleteById
);

// signIn
router.post(
  "/signIn",
  AuthController.signInValidation,
  AuthController.signIn
);

// signUp
router.post(
  "/signUp",
  AuthController.signUpValidation,
  AuthController.signUp
);

export { router };
 