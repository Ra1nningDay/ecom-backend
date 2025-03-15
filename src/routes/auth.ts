import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { Request, Response } from "express";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
