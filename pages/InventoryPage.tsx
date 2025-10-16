import React, { useMemo } from 'react';
import { mockProducts, mockPurchases } from '../lib/data';
import { calculateListingPrice } from '../lib/formulas';
import { formatCurrency } from '../lib/utils';

const InventoryPage: React.FC = () => {
    
    const inventoryData = useMemo(() => {
        return mockProducts.map(product => {
            const lastPurchase = mockPurchases
                .filter(p => p.productId === product.id)
                .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())[0];

            if (!lastPurchase) return null;

            const pricing = calculateListingPrice({
                landedCost: lastPurchase.landedCost,
                gstRate: product.defaultGstRate,
                packagingCharge: product.packagingCharge,
                profitMarginPct: product.profitMarginPct,
                platformFeePct: product.platformFeePct || 0,
            });

            return {
                ...product,
                landedCost: lastPurchase.landedCost,
                ...pricing,
            };
        }).filter(Boolean);
    }, []);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Landed Cost</th>
                            <th className="px-6 py-3">Listing Price</th>
                            <th className="px-6 py-3">Discount (10%)</th>
                            <th className="px-6 py-3">Final Listing Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map(item => (
                            <tr key={item.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-slate-50">{item.name}</td>
                                <td className="px-6 py-4">{formatCurrency(item.landedCost)}</td>
                                <td className="px-6 py-4">{formatCurrency(item.listingPrice)}</td>
                                <td className="px-6 py-4">{formatCurrency(item.discount)}</td>
                                <td className="px-6 py-4 font-bold text-slate-50">{formatCurrency(item.finalListingPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;