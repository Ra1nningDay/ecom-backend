import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token =
        authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

    const secret: Secret = process.env.JWT_SECRET as Secret;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "No token provided!",
        });
        return;
    }

    if (!secret) {
        res.status(500).json({
            success: false,
            message: "JWT_SCRET is not defined!",
        });
        return;
    }

    try {
        const decode = jwt.verify(token, secret) as JwtPayload;

        req.user = decode;

        next();
    } catch (err: unknown) {
        const error = err as Error;
        res.status(401).json({
            success: false,
            message: "Invalid or expired token!",
            error: error.message,
        });
        return;
    }
};

declare module "express" {
    interface Request {
        user?: jwt.JwtPayload | string;
    }
}
