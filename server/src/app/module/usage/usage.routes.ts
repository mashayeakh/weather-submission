import { Router } from "express";
import { getUsage } from "./usage.controller";


const router = Router();

router.get("/usage", getUsage);

export default router;
