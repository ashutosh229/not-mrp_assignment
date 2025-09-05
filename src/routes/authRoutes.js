import express from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authMiddleware, authController.logout);

export default router;
