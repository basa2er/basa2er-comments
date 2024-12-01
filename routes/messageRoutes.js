import { Router } from "express";
import * as messageController from "../controllers/messageController.js";

const router = Router();

router.get("/", messageController.getAllMessages);

export default router;
