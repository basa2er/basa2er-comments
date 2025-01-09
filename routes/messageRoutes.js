import { Router } from "express";
import * as messageController from "../controllers/messageController.js";

const router = Router();

router.get("/:id", messageController.readMessages);
router.post("/", messageController.createMessage);
router.patch("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

export default router;
