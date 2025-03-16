import { Request, Response } from "express";
import { createUser } from "../../services/auth/register.service.js";
import { loginUser } from "../../services/auth/login.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 *
 * @param req - HTTP request containing user email and password
 * @param res - HTTP response sending back the created user or an error
 */

interface userRequest {
    email: string;
    password: string;
    verify_password: string;
}

const AuthController = {
    register: async (
        req: Request<userRequest>,
        res: Response
    ): Promise<void> => {
        const { email, password, verify_password } = req.body;

        if (!password || !verify_password || !email) {
            res.status(400).json({
                message: "Password is required!",
            });
            return;
        }

        if (password !== verify_password) {
            res.status(401).json({
                message: "Passwords do not match!",
            });
            return;
        }

        try {
            const user = await createUser(email, password);

            res.json({
                message: "Register Successfully",
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (err: unknown) {
            const error = err as Error;
            res.status(500).json({
                message: "Error Registator User",
                error: error.message,
            });
        }
    },

    login: async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json("Emaill or Password are required!");
            return;
        }

        try {
            const user = await loginUser(email, password);

            const roleName = user.roles[0]?.role.name || "user";

            const secret = process.env.JWT_SECRET;

            if (!secret) {
                throw new Error("JWT_SECRET Not Found!");
            }

            const token = jwt.sign(
                {
                    user_id: user.id,
                },
                secret,
                {
                    expiresIn: "1day",
                }
            );

            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    role: roleName,
                },
            });
        } catch (err: unknown) {
            const error = err as Error;
            res.status(500).json({
                message: "Error Login User",
                error: error.message,
            });
        }
    },
};

export default AuthController;
