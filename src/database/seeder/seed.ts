import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seeder = async () => {
    try {
        const role = await prisma.role.createMany({
            data: [
                { name: "admin", description: "administrator" },
                { name: "user", description: "user" },
            ],
            skipDuplicates: true,
        });
        console.log("Role created:", role);
    } catch (error) {
        console.error("Error seeding role:", error);
        throw error; // โยน error เพื่อให้ .catch() จัดการ
    }
};

seeder()
    .then(() => console.log("Seeding completed successfully"))
    .catch((error) => console.error("Seeding failed:", error))
    .finally(async () => {
        await prisma.$disconnect(); // ปิดการเชื่อมต่อ Prisma
    });
