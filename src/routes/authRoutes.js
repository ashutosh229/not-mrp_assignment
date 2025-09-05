import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authMiddleware, authController.logout);

export default router;
