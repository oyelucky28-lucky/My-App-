
export const GST_RATES = [5, 12, 18, 28] as const;
export type GstRate = typeof GST_RATES[number];

export const RETURN_TYPES = ['Courier', 'Customer'] as const;
export type ReturnType = typeof RETURN_TYPES[number];

export const RETURN_CONDITIONS = ['Intact', 'Damaged', 'Broken', 'TotalLoss'] as const;
export type ReturnCondition = typeof RETURN_CONDITIONS[number];

export interface Product {
    id: string;
    name: string;
    hsnCode: string;
    defaultGstRate: GstRate;
    packagingCharge: number;
    profitMarginPct: number;
    platformFeePct: number | null;
    imageUrl?: string;
}

export interface Purchase {
    id: string;
    invoiceNo: string;
    purchaseDate: string;
    productId: string;
    quantity: number;
    rate: number;
    gstRate: GstRate;
    shippingCharges: number;
    totalCost: number;
    landedCost: number;
}

export interface InventoryPrice {
    id: string;
    productId: string;
    listingPrice: number;
    discountPct: number;
    finalListingPrice: number;
    bankTransferAmount: number;
}

export interface Sale {
    id: string;
    productId: string;
    saleOrderNo: string;
    saleDate: string;
    quantity: number;
    salePrice: number;
    awbNo: string;
    packetId: string;
    dispatchDate: string;
    bankTransferAmount: number;
    landedCostSnapshot: number;
}

export interface Return {
    id: string;
    productId: string;
    saleOrderNo: string;
    returnDate: string;
    returnType: ReturnType;
    returnCondition: ReturnCondition;
    returnShippingCharges: number;
    lossInInr: number;
    quantity: number;
}

export interface AdCampaign {
    id: string;
    dateOfAd: string;
    perDayCost: number;
    startDate: string;
    endDate: string;
    totalSpent: number;
}

export const PAGES = [
    'Dashboard', 'Purchase', 'Stock', 'Inventory', 'Sales', 'Returns', 
    'Ads Cost', 'Product-wise P/L', 'Monthly Summary', 'Reports', 'Import', 'Settings'
] as const;

export type Page = typeof PAGES[number];
