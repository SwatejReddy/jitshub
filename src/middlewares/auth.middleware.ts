import { Context, Next } from "hono";
import {
    getCookie,
    setCookie,
    deleteCookie
} from 'hono/cookie';
import { verifyJwtToken } from "../utils/jwt";

export const loginMiddleware = async (c: Context, next: Next) => {
    console.log("Inside the login middleware!");
    await next();
}

export const authMiddleware = async (c: Context, next: Next) => {
    // collect jwt from cookie
    const jwt = getCookie(c, 'jwt');
    console.log("Cookie: ", jwt)
    if (!jwt) {
        return c.json({ message: 'Token not recieved' }, 401);
    }
    // verify jwt (fn call to jwt.ts)
    const payload = await verifyJwtToken(c, jwt);
    if (!payload) {
        return c.json({ message: 'Unauthorized' }, 401);
    }
    // set userId in context
    c.set('userId', payload.userId);

    await next();
}
