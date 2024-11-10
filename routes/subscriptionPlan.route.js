import express from "express";
import * as subscriptionPlanController from "../controllers/subscriptionPlan.controller.js"
import handleValidate from "../middlewares/handleValidate.js";
import adminAuthorized from "../middlewares/handleCheckPermission.js";
import { subscriptionPlanSchema } from "../schemas/subscriptionPlan.schema.js";
import protect from "../middlewares/handleProtect.js";

const router = express.Router();

router.get("/", protect,adminAuthorized, subscriptionPlanController.getSubscriptionPlans);
router.post("/", protect, adminAuthorized, handleValidate(subscriptionPlanSchema), subscriptionPlanController.createSubscriptionPlan);
router.put("/:planId", protect, adminAuthorized, handleValidate(subscriptionPlanSchema), subscriptionPlanController.updateSubscriptionPlan);
router.delete("/:planId", protect, adminAuthorized, subscriptionPlanController.deleteSubscriptionPlan);

export default router;