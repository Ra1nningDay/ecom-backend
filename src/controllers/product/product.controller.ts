import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { getProducts } from "../../services/product/product.service.js";

interface apiResource<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

const ProductController = {
    getProducts: async (req: Request, res: Response): Promise<void> => {
        try {
            const products: Product[] = await getProducts();

            res.status(200).json(products);
        } catch (err: unknown) {
            const error = err as Error;
            const response: apiResource<Product[]> = {
                success: false,
                message: "Error Fetching Products",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },
};

export default ProductController;
