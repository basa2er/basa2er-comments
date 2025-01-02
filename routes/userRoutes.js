import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/authenticate", userController.authenticateUser);

export default router;
