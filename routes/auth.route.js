import express from "express";
import * as auhtController from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/login", auhtController.login);
router.post("/register", auhtController.register);

export default router;