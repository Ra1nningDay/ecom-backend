import { loginUser } from "../services/auth/login.service";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            user: {
                create: jest
                    .fn()
                    .mockResolvedValue({ id: 1, email: "test@example.com" }),

                findFirstOrThrow: jest.fn().mockImplementation((query) => {
                    if (query.where.email === "notfound@example.com") {
                        throw new Error("User not found");
                    }
                    return {
                        id: 1,
                        email: "test@example.com",
                        password: "$2a$10$hashedpassword", // mock bcrypt hash
                    };
                }),
            },
        })),
    };
});

jest.mock("bcryptjs", () => ({
    compare: jest.fn().mockImplementation((password, hashedPassword) => {
        return password === "correctpassword"; // Mock bcrypt เทียบกับ password
    }),
}));

describe("loginUser", () => {
    it("should fail when email does not exist", async () => {
        await expect(
            loginUser("notfound@example.com", "password123")
        ).rejects.toThrow("User not found");
    });

    it("should fail when password is incorrect", async () => {
        await expect(
            loginUser("test@example.com", "wrongpassword")
        ).rejects.toThrow("Password is invalid");
    });

    it("should return user when found", async () => {
        const user = await loginUser("test@example.com", "correctpassword");
        expect(user).toBeDefined();
    });

    it("should throw an error when user not found", async () => {
        await expect(
            loginUser("notfound@example.com", "password123")
        ).rejects.toThrow("User not found");
    });
});
