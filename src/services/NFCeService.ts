export type NFCeResult = {
    storeName: string;
    totalValue: number;
    tributes: number;
    purchaseDate: Date;
};

const fetchNFCeData = async (p: string): Promise<NFCeResult> => {
    return {
        storeName: "",
        totalValue: 0,
        tributes: 0,
        purchaseDate: new Date(),
    };
};

export default {
    fetchNFCeData,
};
