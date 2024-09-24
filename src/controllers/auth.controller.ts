import { Context } from "hono";

export const signupUser = async (c: Context) => {
    return c.json({ message: 'User Created' });
}

export const loginUser = async (c: Context) => {
    console.log("Inside the login route!");
    return c.json({ message: 'User Logged In' });
}