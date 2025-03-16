import express from "express";
import ProductController from "../controllers/product/product.controller.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);

export default router;
