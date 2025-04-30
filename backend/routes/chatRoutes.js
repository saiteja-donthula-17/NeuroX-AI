import express from "express";
import { requireAuth } from "@clerk/express";
import { 
  createChat, 
  deleteChat, 
  getChat, 
  updateChat 
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", requireAuth(), createChat);
router.delete("/:id", requireAuth(), deleteChat);
router.get("/:id", requireAuth(), getChat);
router.put("/:id", requireAuth(), updateChat);

export default router;