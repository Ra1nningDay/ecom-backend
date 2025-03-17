import { Category, PrismaClient, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const getProductsService = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
        throw { message: "No products found!" };
    }

    return products;
};

const getProductByIdService = async (id: string): Promise<Product | null> => {
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

const createProductService = async (
    name: string,
    price: number,
    category_id: number,
    stock_quantity: number
): Promise<Product | null> => {
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

const updateProductService = async (
    id: string,
    name: string,
    price: number,
    stock_quantity: number,
    category_id: number
): Promise<Product | null> => {
    const categoryExists = await prisma.category.findUnique({
        where: { id: category_id },
    });

    if (!categoryExists) {
        throw {
            success: false,
            message: `Category with id ${category_id} not found`,
        };
    }

    const product = await prisma.product.update({
        where: {
            id: Number(id),
        },
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

const deleteProductService = async (id: string) => {
    const product = await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });

    return product;
};

export {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
};
