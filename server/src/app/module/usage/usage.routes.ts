import { Router } from "express";
import { getUsage } from "./usage.controller";


const router = Router();

// GET /api/usage  — monthly quota and plan information
router.get("/usage", getUsage);

export default router;
