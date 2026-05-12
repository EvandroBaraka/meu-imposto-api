import { Router } from "express";
import authRoutes from "./authRoutes";
import receiptRoutes from "./receiptsRoutes";
import statsRoutes from "./statsRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/receipts", receiptRoutes);
router.use("/stats", statsRoutes);

export default router;
