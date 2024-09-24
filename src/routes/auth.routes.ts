import { Hono } from "hono";
import { loginUser, signupUser } from "../controllers/auth.controller";

export const authRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables: {
        userId: string
    }
}>();

authRouter.use('/signup').post(signupUser);
authRouter.use('/login').post(loginUser);