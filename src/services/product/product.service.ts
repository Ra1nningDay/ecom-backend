import { PrismaClient, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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
            id: Number(id),
        },
    });

    if (!product) {
        throw { message: "No a product found!" };
    }

    return product as Product;
};

const createProduct = async (
    name: string,
    price: number,
    category_id: number,
    stock_quantity: number
): Promise<Product | null> => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            stock_quantity,
            category: {
                connect: {
                    id: category_id,
                },
            },
        },
    });

    return product;
};

export { getProducts, getProductById, createProduct };
