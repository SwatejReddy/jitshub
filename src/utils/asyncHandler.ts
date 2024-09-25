import { Context, Next } from "hono";

export const asyncHandler = (requestHandler: (c: Context, next: Next) => Promise<void>) => {
    return async (c: Context, next: Next) => {
        Promise.resolve(requestHandler(c, next)).catch(next);
    }
}