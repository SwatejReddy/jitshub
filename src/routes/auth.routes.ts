import { Hono } from "hono";
import { loginUser, logoutUser, signupFaculty, signupUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables: {
        userId: string
    }
}>();

authRouter.use('/signup/user').post(signupUser);
authRouter.use('/signup/faculty').post(signupFaculty);
authRouter.use('/login').post(loginUser);
authRouter.use('/logout').post(authMiddleware, logoutUser);