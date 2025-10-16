
import { Purchase, Product } from '../types';

interface ListingPriceInputs {
    landedCost: number;
    gstRate: number;
    packagingCharge?: number;
    profitMarginPct?: number;
    platformFeePct?: number;
}

export function calculateLandedCost(purchase: Omit<Purchase, 'id' | 'totalCost' | 'landedCost'>): { totalCost: number, landedCost: number } {
    const baseValue = purchase.quantity * purchase.rate;
    const gstAmount = baseValue * (purchase.gstRate / 100);
    const totalCost = baseValue + gstAmount + purchase.shippingCharges;
    const landedCost = totalCost / purchase.quantity;
    return { totalCost, landedCost };
}

export function calculateListingPrice({
    landedCost,
    gstRate,
    packagingCharge = 15,
    profitMarginPct = 48,
    platformFeePct = 15,
}: ListingPriceInputs) {
    const gstComponent = landedCost * (gstRate / 100);
    const profitMarginComponent = landedCost * (profitMarginPct / 100);
    const platformFeeComponent = landedCost * (platformFeePct / 100);
    
    const listingPrice = landedCost + gstComponent + packagingCharge + profitMarginComponent + platformFeeComponent;
    const discount = listingPrice * 0.10;
    const finalListingPrice = listingPrice - discount;

    return {
        listingPrice,
        discount,
        finalListingPrice,
    };
}
