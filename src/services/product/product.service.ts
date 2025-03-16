import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

const getProducts = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
        throw { message: "No products found!" };
    }

    return products;
};

const getProductById = async (id: string): Promise<Product | null> => {
    const product = await prisma.product.findFirst({
        where: {
            id: parseInt(id),
        },
    });

    if (!product) {
        throw { message: "No product found!" };
    }

    return product as Product;
};

export { getProducts, getProductById };
