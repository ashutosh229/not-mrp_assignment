import express from "express";
import {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
