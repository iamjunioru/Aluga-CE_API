import { userRouter } from "./users";
import { authRouter } from "./auth";
import { reviewRouter } from "./reviews";
import { propertyRouter } from "./properties";

// export all routes
export const router = [userRouter, authRouter, propertyRouter,  reviewRouter];