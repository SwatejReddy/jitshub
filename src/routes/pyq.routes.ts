import { Hono } from "hono";
import { loginUser, signupUser } from "../controllers/auth.controller";
import { loginMiddleware } from "../middlewares/auth.middleware";

export const pyqRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables: {
        userId: string
    }
}>();

pyqRouter.use('/post').post();
pyqRouter.use('/view/:id').get();