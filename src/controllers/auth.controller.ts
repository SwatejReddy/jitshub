import { Context } from "hono";
import { ISignUp } from "../schemas/types";
import { generateJwtToken } from "../utils/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { LoginSchema, SignUpSchema } from "../schemas/zod";
import { PrismaClient } from "@prisma/client/edge";
import { generateSalt, hashPassword } from "../utils/auth";

export const signupUser = async (c: Context) => {
    console.log(c.env.DATABASE_URL)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate()).$extends({
        query: {
            user: {
                async $allOperations({ operation, args, query }) {
                    if (['create'].includes(operation) && (args as any).data['password']) {
                        const salt = generateSalt();
                        const hashedPassword = await hashPassword(body.password, salt);
                        (args as any).data['password'] = hashedPassword;
                        (args as any).data['salt'] = salt;
                    }
                    return query(args)
                }
            }
        }
    });

    const body: ISignUp = await c.req.json();
    const { name, email, rollNo, department, year, username, password } = SignUpSchema.parse(body);

    // check if the user already exists (username & email)
    const userAlreadyExists = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    })
    if (userAlreadyExists) {
        return c.json({ message: 'User Already Exists' }, 400);
    }
    // if user does not exists, create a new user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            rollNo,
            department,
            year,
            username,
            password,
            salt: ""
        },
        select: {
            id: true,
            name: true,
            email: true,
            rollNo: true,
            department: true,
            year: true,
            username: true,
            salt: true,
            password: true
        }
    })
    return c.json({ message: 'User Created', user: user }, 201);
}

export const loginUser = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { username, password } = LoginSchema.parse(body);

    if (!body)

        console.log("Inside the login route!");
    return c.json({ message: 'User Logged In' });
}