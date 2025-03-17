import { Request, Response } from "express";
import { Category } from "@prisma/client";
import {
    createCategoryService,
    getCategoryByIdService,
    getCategorysService,
    updateCategoryService,
    deleteCategoryService,
} from "../../services/category_product/category.service.js";
import { categorySchema } from "../validators/category.validator.js";

/**
 * @param req Http request container Category id name price quantity
 * @param res Http response sending back Category to client
 */

interface apiResource<T> {
    success: boolean;
    message?: string;
    data?: T | T[];
    error?: string;
}

const CategoryController = {
    getCategorys: async (req: Request, res: Response): Promise<void> => {
        try {
            const Categorys: Category[] | undefined =
                await getCategorysService();

            const response: apiResource<Category | null> = {
                success: true,
                data: Categorys,
            };

            res.status(200).json(response);
        } catch (err: unknown) {
            const error = err as Error;
            const response: apiResource<Category[]> = {
                success: false,
                message: "Error fetching Categorys",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    getCategoryById: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const Category: Category | null = await getCategoryByIdService(id);

            const response: apiResource<Category | null> = {
                success: true,
                data: Category,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Category | null> = {
                success: false,
                message: "Error fetching Category",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    createCategory: async (
        req: Request<any, any, Category>,
        res: Response
    ): Promise<void> => {
        try {
            const validated = categorySchema.parse(req.body);
            const Category: Category | null = await createCategoryService(
                validated.name,
                validated.description || ""
            );

            const response: apiResource<Category | null> = {
                success: true,
                data: Category,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Category | null> = {
                success: false,
                message: "Error creating Category",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    updateCategory: async (
        req: Request<{ id: string }, any, Category>,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const validated = categorySchema.parse(req.body);

            const Category: Category | null = await updateCategoryService(
                id,
                validated.name,
                validated.description || ""
            );

            const response: apiResource<Category | null> = {
                success: true,
                data: Category,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Category | null> = {
                success: false,
                message: "Error updating Category",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },

    deleteCategory: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const Category = await deleteCategoryService(Number(id));

            const response: apiResource<Category | null> = {
                success: true,
                data: Category,
            };

            res.status(200).json(response);
        } catch (err) {
            const error = err as Error;
            const response: apiResource<Category | null> = {
                success: false,
                message: "Error updating Category",
                error: error.message,
            };
            res.status(500).json(response);
        }
    },
};

export default CategoryController;
