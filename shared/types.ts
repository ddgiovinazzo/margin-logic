export interface CalculationInputs {
    itemCost: number;
    handlingFee: number;
    fixedFee: number;
    fvfRate: number;
    adRate: number;
    taxRate: number;
}

export interface SearchItem {
    itemId: string;
    title: string;
    price: string;
    currency: string;
    image?: string;
    itemWebUrl?: string;
    condition?: string;
}

export interface SearchResponse {
    results: SearchItem[];
}
