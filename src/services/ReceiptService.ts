import { prisma } from "../utils/prisma";
import { Receipt } from "../types";

const createReceipt = async (userId: string, data: Receipt) => {
    return await prisma.receipts.create({
        data: {
            userId,
            storeName: data.storeName,
            totalValue: data.totalValue,
            tributes: data.tributes,
            purchaseDate: new Date(data.purchaseDate),
            nfeKey: data.nfeKey,
        },
    });
};

const listReceipts = async (userId: string | undefined) => {
    return ["teste"];
};

const searchReceipt = async (p: string, userId: string | undefined) => {
    return {
        p,
        storeName: "",
        totalValue: 0,
        tributes: 0,
        purchaseDate: new Date(),
    };
};

const getReceiptByNfeKey = async (nfeKey: string, userId: string | undefined) => {
    const receipt = await prisma.receipts.findFirst({
        where: {
            nfeKey,
            userId,
        },
    });

    return receipt || null;
};

const deleteReceipt = async (receiptId: string, userId: string | undefined) => {
    return null;
};

const getTaxesSummary = async (userId: string | undefined, query: any) => {
    return {
        totalSpent: 0,
        totalTaxes: 0,
        period: query,
    };
};

export default {
    createReceipt,
    listReceipts,
    searchReceipt,
    getReceiptByNfeKey,
    deleteReceipt,
    getTaxesSummary,
};
