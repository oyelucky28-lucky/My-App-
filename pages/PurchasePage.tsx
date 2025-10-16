import React from 'react';
import { mockPurchases, mockProducts } from '../lib/data';
import { formatCurrency, formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import { PlusCircle } from '../components/icons';

const PurchasePage: React.FC = () => {
    return (
        <div>
            <div className="flex justify-end mb-4">
                 <Button leftIcon={<PlusCircle />}>
                    Add Purchase
                </Button>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                            <tr>
                                <th className="px-6 py-3">Invoice No</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Qty</th>
                                <th className="px-6 py-3">Rate</th>
                                <th className="px-6 py-3">Landed Cost</th>
                                <th className="px-6 py-3">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPurchases.map(purchase => {
                                const product = mockProducts.find(p => p.id === purchase.productId);
                                return (
                                    <tr key={purchase.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-medium text-slate-50">{purchase.invoiceNo}</td>
                                        <td className="px-6 py-4">{formatDate(purchase.purchaseDate)}</td>
                                        <td className="px-6 py-4">{product?.name}</td>
                                        <td className="px-6 py-4">{purchase.quantity}</td>
                                        <td className="px-6 py-4">{formatCurrency(purchase.rate)}</td>
                                        <td className="px-6 py-4">{formatCurrency(purchase.landedCost)}</td>
                                        <td className="px-6 py-4">{formatCurrency(purchase.totalCost)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;