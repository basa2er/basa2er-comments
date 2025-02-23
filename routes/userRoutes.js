import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/export", userController.exportUsers);
router.post("/import", userController.importUsers);

router.post("/register", userController.registerUser);
router.post("/authenticate", userController.authenticateUser);

export default router;
