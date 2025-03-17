import { z } from "zod";

export const userSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(8),
    verify_password: z.string().min(8),
});
