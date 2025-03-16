import express from "express";
import ProductController from "../controllers/product/product.controller.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductById);

export default router;
