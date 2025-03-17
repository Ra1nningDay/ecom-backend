import { Request, Response } from "express";
import { Product } from "@prisma/client";
import {
    createProductService,
    getProductByIdService,
    getProductsService,
    updateProductService,
    deleteProductService,
} from "../../services/product/product.service.js";

/**
 * @param req Http request container product id name price quantity
 * @param res Http response sending back product to client
 */

interface apiResource<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

const ProductController = {
    getProducts: async (req: Request, res: Response): Promise<void> => {
        try {
            const products: Product[] = await getProductsService();

            res.status(200).json(products);
        } catch (err: unknown) {
            const error = err as Error;
            const response: apiResource<Product[]> = {
                success: false,
                message: "Error fetching products",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    getProductById: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;

            if (isNaN(Number(id)) || !id) {
                res.status(400).json({
                    success: false,
                    message: "Invalid product ID",
                });
            }

            const product: Product | null = await getProductByIdService(id);

            const response: apiResource<Product | null> = {
                success: true,
                data: product,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Product | null> = {
                success: false,
                message: "Error fetching product",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    createProduct: async (req: Request<any, any, Product>, res: Response) => {
        try {
            const { name, price, stock_quantity, category_id } = req.body;
            const product: Product | null = await createProductService(
                name,
                Number(price),
                category_id,
                stock_quantity
            );

            const response: apiResource<Product | null> = {
                success: true,
                data: product,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Product | null> = {
                success: false,
                message: "Error creating product",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    updateProduct: async (
        req: Request<{ id: string }, any, Product>,
        res: Response
    ) => {
        try {
            const { id } = req.params;
            const { name, price, stock_quantity, category_id } = req.body;

            const product = await updateProductService(
                id,
                name,
                Number(price),
                stock_quantity,
                category_id
            );

            const response: apiResource<Product | null> = {
                success: true,
                data: product,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Product | null> = {
                success: false,
                message: "Error updating product",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    deleteProduct: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { id } = req.params;
            const product = await deleteProductService(id);

            const response: apiResource<Product | null> = {
                success: true,
                data: product,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Product | null> = {
                success: false,
                message: "Error updating product",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },
};

export default ProductController;
