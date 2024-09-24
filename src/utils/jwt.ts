import { Context } from "hono";
import jwt from "jsonwebtoken";

export const generateJwtToken = (c: Context, payload: any) => {
    return jwt.sign(payload, c.env.SECRET_KEY);
}

export const verifyJwtToken = (c: Context, token: string) => {
    return jwt.verify(token, c.env.SECRET_KEY);
}