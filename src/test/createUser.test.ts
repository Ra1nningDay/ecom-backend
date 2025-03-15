import { createUser } from "../services/auth/register.service";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            user: {
                create: jest
                    .fn()
                    .mockResolvedValue({ id: 1, email: "test@example.com" }),
                findUnique: jest.fn().mockResolvedValue(null),
            },
            role: {
                findFirstOrThrow: jest
                    .fn()
                    .mockResolvedValue({ id: 2, name: "user" }),
            },
        })),
    };
});

describe("createUser", () => {
    it("should create a new user successfully", async () => {
        const user = await createUser("test@example.com", "password123");
        expect(user).toEqual({ id: 1, email: "test@example.com" });
    });
});
