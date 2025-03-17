import { Category, PrismaClient, Product } from "@prisma/client";
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
    // ตรวจสอบว่า Category มีอยู่จริง
    const categoryExists = await prisma.category.findUnique({
        where: { id: category_id },
    });

    if (!categoryExists) {
        throw {
            success: false,
            message: `Category with id ${category_id} not found`,
        };
    }

    const product = await prisma.product.create({
        data: {
            name,
            price: price,
            category: {
                connect: {
                    id: categoryExists.id,
                },
            },
            stock_quantity,
        },
    });

    return product;
};

export { getProducts, getProductById, createProduct };
