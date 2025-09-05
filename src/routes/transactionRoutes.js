import express from "express";
import {
  inventoryReport,
  customerVendorHistory,
  listTransactions,
  createTransaction,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listTransactions);
router.post("/", createTransaction);
router.get("/reports/inventory", inventoryReport);
router.get("/reports/history/:contactId", customerVendorHistory);

export default router;
