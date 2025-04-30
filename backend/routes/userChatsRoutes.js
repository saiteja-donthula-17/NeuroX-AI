import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserChats } from "../controllers/userChatsController.js";

const router = express.Router();

router.get("/", requireAuth(), getUserChats);

export default router;