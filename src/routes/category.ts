import express from "express";
import CategoryController from "../controllers/category_product/category.controller.js";

const router = express.Router();

router.get("/categorys", CategoryController.getCategorys);
router.get("/category/:id", CategoryController.getCategoryById);
router.post("/category", CategoryController.createCategory);
router.put("/category/:id", CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

export default router;
