import { Request, Response, Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

// signIn
authRouter.post("/signIn", AuthController.signInValidation, AuthController.signIn);

// signUp
authRouter.post("/signUp", AuthController.signUpValidation, AuthController.signUp);

export { authRouter };