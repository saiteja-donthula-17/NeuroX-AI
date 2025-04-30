import express from "express";
import { getUploadParams } from "../controllers/uploadController.js";

const router = express.Router();

router.get("/", getUploadParams);

export default router;