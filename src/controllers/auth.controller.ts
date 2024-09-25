import { Context } from "hono";
import { ISignUp } from "../schemas/types";
import { generateJwtToken } from "../utils/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { LoginSchema, SignUpSchema } from "../schemas/zod";
import { PrismaClient } from "@prisma/client/edge";
import { generateSalt, hashPassword } from "../utils/hashing";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { setCookie } from "hono/cookie";

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
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const isValid = LoginSchema.safeParse(body);

        console.log(isValid.success, body);

        if (!body || !isValid.success) {
            c.json({ message: 'Invalid Inputs' }, 400);
        }

        const { username, password } = LoginSchema.parse(body);

        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (!user) {
            throw new ApiError(401, 'Invalid Request');
        }

        console.log(user);

        const hashedPassword = await hashPassword(password, user.salt);
        if (hashedPassword !== user.password) {
            throw new ApiError(401, 'Invalid Request');
        }

        const token = await generateJwtToken(c, user.id);
        setCookie(c, 'jwt', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        return c.json(new ApiResponse(200, { message: 'User Logged In', token }));
    } catch (error) {
        throw new ApiError(401, 'Invalid Request');
    }
}

export const logoutUser = async (c: Context) => {
    setCookie(c, 'jwt', '', { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(0) });
    return c.json(new ApiResponse(200, { message: 'User Logged Out' }));
}
