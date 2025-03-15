import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const loginUser = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: email },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw { status: 401, message: "Password is invalid!" };
        }

        return user;
    } catch (err) {
        throw err;
    }
};

export { loginUser };
