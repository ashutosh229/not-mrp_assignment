import express from "express";
import warmup from "../controllers/warmupController.js";

const router = express.Router();

router.get("/", warmup);

export default router;
