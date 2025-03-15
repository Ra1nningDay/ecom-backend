// test-prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testRole() {
    try {
        const role = await prisma.role.findFirstOrThrow({
            where: { name: "user" },
        });
        console.log("Role:", role.id);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

testRole();
