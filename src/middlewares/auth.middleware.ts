import { Context, Next } from "hono";

export const loginMiddleware = async (c: Context, next: Next) => {
    console.log("Inside the login middleware!");
    await next();
}