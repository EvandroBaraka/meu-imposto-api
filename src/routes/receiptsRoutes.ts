import { Router } from "express";
import ReceiptController from "../controllers/ReceiptController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/receipts:
 *   post:
 *     summary: Adiciona um novo cupom fiscal manualmente
 *     tags: [Receipts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - storeName
 *               - totalValue
 *               - tributes
 *               - purchaseDate
 *             properties:
 *               storeName:
 *                 type: string
 *                 description: Nome do estabelecimento onde a compra foi realizada
 *                 example: "Supermercado Exemplo"
 *               totalValue:
 *                 type: number
 *                 description: Valor total da compra
 *                 example: 150.50
 *               tributes:
 *                 type: number
 *                 description: Valor dos impostos
 *                 example: 12.30
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *                 description: Data da compra no formato YYYY-MM-DD
 *                 example: "2023-10-25"
 *               nfeKey:
 *                 type: string
 *                 description: Chave da nota fiscal eletrônica
 *                 example: "35231012345678901234567890123456789012345678"
 *     responses:
 *       201:
 *         description: Cupom adicionado com sucesso
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", ReceiptController.addReceipt);
router.get("/", ReceiptController.listReceipts);
router.post("/search", ReceiptController.searchReceipt);
router.get("/:id", ReceiptController.getReceipt);
router.delete("/:id", ReceiptController.deleteReceipt);

export default router;