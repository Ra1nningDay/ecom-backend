import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
    const round = 10;
    const hashedPassword = await bcrypt.hash(password, round);
    return hashedPassword;
};

const createUser = async (email: string, password: string) => {
    //Fetch the default role for new users
    const Role = await prisma.role.findFirstOrThrow({
        where: { name: "user" },
    });

    if (!Role) {
        throw { status: 500, message: "Role not found!" };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        throw { status: 409, message: "User already exits" };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            avatar: "", //(Can update later)
            roles: {
                create: {
                    role: {
                        connect: { id: Role.id },
                    },
                },
            },
        },
    });
    return user;
};

export { createUser };
