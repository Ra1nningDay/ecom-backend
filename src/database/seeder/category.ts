import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seeder = async () => {
    try {
        const category = await prisma.category.createMany({
            data: [
                { name: "clothes", description: "" },
                { name: "shoes", description: "" },
            ],
            skipDuplicates: true,
        });
        console.log("Category created:", category);
    } catch (error) {
        console.error("Error seeding category:", error);
        throw error; // โยน error เพื่อให้ .catch() จัดการ
    }
};

seeder()
    .then(() => console.log("Seeding completed successfully"))
    .catch((error) => console.error("Seeding failed:", error))
    .finally(async () => {
        await prisma.$disconnect(); // ปิดการเชื่อมต่อ Prisma
    });
