import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

const getProducts = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
        throw { message: "No products found!" };
    }

    return products;
};

export { getProducts };
