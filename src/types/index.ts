export interface AuthRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends AuthRequest {
    name?: string;
}

export interface User {
    id: string;
    email: string;
    name?: string | null;
}

export interface Receipt {
    id: string;
    storeName: string;
    totalValue: number;
    tributes: number;
    purchaseDate: Date;
    nfeKey?: string;
}