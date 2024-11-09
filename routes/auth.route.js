import express from "express";
import * as auhtController from "../controllers/auth.controller.js"
import handleValidate from "../middlewares/handleValidate.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";
const router = express.Router();

router.post("/login", handleValidate(loginSchema), auhtController.login);
router.post("/register", handleValidate(registerSchema), auhtController.register);

export default router;