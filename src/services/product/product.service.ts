import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

const showProducts = async (): Promise<Product[]> => {
    try {
        const products = await prisma.product.findMany();

        if (products.length === 0) {
            throw { message: "No products found!" };
        }

        return products;
    } catch (err) {
        const error = err as Error;
        throw { message: "Error Fateching Products", error: error.message };
    }
};

export { showProducts };
