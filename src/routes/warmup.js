import express from "express";
import warmup from "../controllers/warmupController";

const router = express.Router();

router.get("/", warmup);
