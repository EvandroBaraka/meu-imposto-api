import { Router } from "express";
import StatsController from "../controllers/StatsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/summary", StatsController.summary);

export default router;
