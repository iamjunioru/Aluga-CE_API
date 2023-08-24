import { userRouter } from "./users";
import { authRouter } from "./auth";
import { reviewRouter } from "./reviews";
import { propertyRouter } from "./properties";
import { imagesRouter } from "./images";

// export all routes
export const router = [userRouter, authRouter, propertyRouter,  reviewRouter, imagesRouter];