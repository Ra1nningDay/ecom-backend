import { z } from "zod";

export const productSchema = z.object({
    name: z.string(),
    price: z.number().positive(),
    stock_quantity: z.number().positive().min(1),
    category_id: z.number().positive(),
});
