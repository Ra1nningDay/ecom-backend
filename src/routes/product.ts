import express from "express";
import ProductController from "../controllers/product/product.controller.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductById);
router.post("/product", ProductController.createProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);

export default router;
