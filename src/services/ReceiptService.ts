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

const getReceiptById = async (receiptId: string, userId: string | undefined) => {
    return null;
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
    listReceipts,
    searchReceipt,
    getReceiptById,
    deleteReceipt,
    getTaxesSummary,
};
