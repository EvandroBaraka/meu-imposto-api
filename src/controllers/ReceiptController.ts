import { Request, Response } from "express";
import ReceiptService from "../services/ReceiptService";

const addReceipt = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const existingReceipt = await ReceiptService.getReceiptByNfeKey(req.body.nfeKey, userId);
        if (existingReceipt) {
            return res.status(409).json({ error: "Cupom já cadastrado" });
        }

        const receipt = await ReceiptService.createReceipt(userId, req.body);
        return res.status(201).json(receipt);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

const listReceipts = async (req: Request, res: Response) => {
    const receipts = await ReceiptService.listReceipts(req.user?.id);
    return res.status(200).json(receipts);
};

const searchReceipt = async (req: Request, res: Response) => {
    const result = await ReceiptService.searchReceipt(req.body.p, req.user?.id);
    return res.status(200).json(result);
};

const getReceipt = async (req: Request, res: Response) => {
    const receipt = await ReceiptService.getReceiptByNfeKey(
        req.params.nfeKey as string,
        req.user?.id,
    );
    return res.status(200).json(receipt);
};

const deleteReceipt = async (req: Request, res: Response) => {
    await ReceiptService.deleteReceipt(req.params.id as string, req.user?.id);
    return res.status(204).send();
};

export default {
    listReceipts,
    searchReceipt,
    getReceipt,
    deleteReceipt,
    addReceipt,
};
