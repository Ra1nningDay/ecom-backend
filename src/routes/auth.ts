import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth/auth.controller.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
