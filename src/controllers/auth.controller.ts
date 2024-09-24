import { Context } from "hono";
import { ISignUp } from "../schemas/types";
import { generateJwtToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";

export const signupUser = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body: ISignUp = await c.req.json();
    const { name, email, rollNo, department, year, username, password } = body;

    return c.json({ message: 'User Created' });
}

export const loginUser = async (c: Context) => {
    console.log("Inside the login route!");
    return c.json({ message: 'User Logged In' });
}