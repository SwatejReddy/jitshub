import { Hono } from "hono";
import { loginUser, signupUser } from "../controllers/auth.controller";
import { loginMiddleware } from "../middlewares/auth.middleware";

export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables: {
        userId: string
    }
}>();