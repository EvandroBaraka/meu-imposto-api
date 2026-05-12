import { Request, Response } from "express";
import ReceiptService from "../services/ReceiptService";

const listReceipts = async (req: Request, res: Response) => {
    const receipts = await ReceiptService.listReceipts(req.user?.id);
    return res.status(200).json(receipts);
};

const searchReceipt = async (req: Request, res: Response) => {
    const result = await ReceiptService.searchReceipt(req.body.p, req.user?.id);
    return res.status(200).json(result);
};

const getReceipt = async (req: Request, res: Response) => {
    const receipt = await ReceiptService.getReceiptById(
        req.params.id as string,
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
};
