import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthResponse {
    success: boolean;
    message: string;
    error?: string;
}

declare module "express" {
    interface Request {
        user?: JwtPayload;
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token =
        authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

    const secret: Secret | undefined = process.env.JWT_SECRET as Secret;
    if (typeof secret !== "string") {
        const response: AuthResponse = {
            success: false,
            message: "JWT_SECRET is not defined!",
        };
        res.status(500).json(response);
        return;
    }
    if (!token) {
        const response: AuthResponse = {
            success: false,
            message: "No token provided!",
        };

        res.status(401).json(response);
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
        const response: AuthResponse = {
            success: false,
            message: "Invalid or expired token!",
            error: error.message,
        };
        res.status(401).json(response);
        return;
    }
};
