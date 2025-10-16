
import { Product, Purchase, Sale, Return, AdCampaign, GstRate, ReturnType, ReturnCondition } from '../types';

export const mockProducts: Product[] = [
    { id: 'prod-001', name: 'Handcrafted Wooden Bowl', hsnCode: '44190010', defaultGstRate: 12, packagingCharge: 15, profitMarginPct: 48, platformFeePct: 15, imageUrl: 'https://picsum.photos/seed/bowl/400/400' },
    { id: 'prod-002', name: 'Ceramic Coffee Mug', hsnCode: '69120010', defaultGstRate: 18, packagingCharge: 15, profitMarginPct: 48, platformFeePct: 15, imageUrl: 'https://picsum.photos/seed/mug/400/400' },
    { id: 'prod-003', name: 'Linen Throw Pillow', hsnCode: '94049019', defaultGstRate: 18, packagingCharge: 15, profitMarginPct: 48, platformFeePct: 12, imageUrl: 'https://picsum.photos/seed/pillow/400/400' },
    { id: 'prod-004', name: 'Scented Soy Candle', hsnCode: '34060010', defaultGstRate: 12, packagingCharge: 15, profitMarginPct: 48, platformFeePct: 18, imageUrl: 'https://picsum.photos/seed/candle/400/400' },
];

export const mockPurchases: Purchase[] = [
    { id: 'pur-001', invoiceNo: 'INV-2023-001', purchaseDate: '2023-10-01', productId: 'prod-001', quantity: 50, rate: 250, gstRate: 12, shippingCharges: 500, totalCost: 14500, landedCost: 290 },
    { id: 'pur-002', invoiceNo: 'INV-2023-002', purchaseDate: '2023-10-02', productId: 'prod-002', quantity: 100, rate: 150, gstRate: 18, shippingCharges: 800, totalCost: 18500, landedCost: 185 },
    { id: 'pur-003', invoiceNo: 'INV-2023-003', purchaseDate: '2023-10-05', productId: 'prod-003', quantity: 75, rate: 400, gstRate: 18, shippingCharges: 1000, totalCost: 36400, landedCost: 485.33 },
    { id: 'pur-004', invoiceNo: 'INV-2023-004', purchaseDate: '2023-10-06', productId: 'prod-004', quantity: 120, rate: 200, gstRate: 12, shippingCharges: 700, totalCost: 27580, landedCost: 229.83 },
    { id: 'pur-005', invoiceNo: 'INV-2023-005', purchaseDate: '2023-11-01', productId: 'prod-001', quantity: 30, rate: 260, gstRate: 12, shippingCharges: 300, totalCost: 9036, landedCost: 301.20 },
];

export const mockSales: Sale[] = [
    { id: 'sale-001', productId: 'prod-001', saleOrderNo: 'ORD-AMZ-001', saleDate: '2023-10-15', quantity: 1, salePrice: 650, awbNo: 'AWB123456789', packetId: 'PKT987654321', dispatchDate: '2023-10-16', bankTransferAmount: 552.50, landedCostSnapshot: 290 },
    { id: 'sale-002', productId: 'prod-002', saleOrderNo: 'ORD-MSH-001', saleDate: '2023-10-18', quantity: 2, salePrice: 400, awbNo: 'AWB123456790', packetId: 'PKT987654322', dispatchDate: '2023-10-19', bankTransferAmount: 680, landedCostSnapshot: 185 },
    { id: 'sale-003', productId: 'prod-003', saleOrderNo: 'ORD-AMZ-002', saleDate: '2023-10-22', quantity: 1, salePrice: 1100, awbNo: 'AWB123456791', packetId: 'PKT987654323', dispatchDate: '2023-10-23', bankTransferAmount: 968, landedCostSnapshot: 485.33 },
    { id: 'sale-004', productId: 'prod-001', saleOrderNo: 'ORD-AMZ-003', saleDate: '2023-11-05', quantity: 1, salePrice: 650, awbNo: 'AWB123456792', packetId: 'PKT987654324', dispatchDate: '2023-11-06', bankTransferAmount: 552.50, landedCostSnapshot: 301.20 },
];

export const mockReturns: Return[] = [
    { id: 'ret-001', productId: 'prod-002', saleOrderNo: 'ORD-MSH-001', returnDate: '2023-10-25', returnType: 'Customer', returnCondition: 'Intact', returnShippingCharges: 60, lossInInr: -340, quantity: 1 },
];

export const mockAdCampaigns: AdCampaign[] = [
    { id: 'ad-001', dateOfAd: '2023-10-10', perDayCost: 500, startDate: '2023-10-10', endDate: '2023-10-20', totalSpent: 5000 },
    { id: 'ad-002', dateOfAd: '2023-11-01', perDayCost: 750, startDate: '2023-11-01', endDate: '2023-11-15', totalSpent: 11250 },
];
