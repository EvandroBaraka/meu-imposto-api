import { Router } from "express";
import ReceiptController from "../controllers/ReceiptController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/", ReceiptController.listReceipts);
router.post("/search", ReceiptController.searchReceipt);
router.get("/:id", ReceiptController.getReceipt);
router.delete("/:id", ReceiptController.deleteReceipt);

export default router;