import express from "express";
import * as userController from "../controllers/user.controller.js"
import handleValidate from "../middlewares/handleValidate.js";
import adminAuthorized from "../middlewares/handleCheckPermission.js";
import { userSchema } from "../schemas/user.schema.js";
import protect from "../middlewares/handleProtect.js";

const router = express.Router();

router.get("/me", protect, userController.getAuthenticatedUser);
router.get("/:userId", protect, adminAuthorized, userController.getUser);
router.put("/:userId", protect, adminAuthorized, handleValidate(userSchema), userController.updateUser);

export default router;