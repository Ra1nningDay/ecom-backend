import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const del = async () => {
    try {
        const role = await prisma.role.delete({
            where: { id: 2 },
        });
        console.log("Role created:", role);
    } catch (error) {
        console.error("Error seeding role:", error);
        throw error; // โยน error เพื่อให้ .catch() จัดการ
    }
};

del()
    .then(() => console.log("Seeding completed successfully"))
    .catch((error) => console.error("Seeding failed:", error))
    .finally(async () => {
        await prisma.$disconnect(); // ปิดการเชื่อมต่อ Prisma
    });
