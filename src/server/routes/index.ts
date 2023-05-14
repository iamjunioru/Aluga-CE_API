import { userRouter } from "./users";
import { authRouter } from "./auth";
import { propertyRouter } from "./properties";

// export all routes
export const router = [userRouter, authRouter, propertyRouter];