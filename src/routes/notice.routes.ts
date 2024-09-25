import { Hono } from "hono";
import { loginUser, signupUser } from "../controllers/auth.controller";
import { loginMiddleware } from "../middlewares/auth.middleware";
import { createNotice } from "../controllers/notice.controller";

export const noticeRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_KEY: string
    }
    Variables: {
        userId: string
    }
}>();

// public routes
noticeRouter.use('/all').get()


// protected routes
noticeRouter.use('/create').post(createNotice)
noticeRouter.use('/update/:id').post()
noticeRouter.use('/delete/:id').post()
