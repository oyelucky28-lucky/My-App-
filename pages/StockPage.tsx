import React, { useMemo } from 'react';
import { mockProducts, mockPurchases, mockSales, mockReturns } from '../lib/data';

const StockPage: React.FC = () => {
    const stockData = useMemo(() => {
        return mockProducts.map(product => {
            const purchased = mockPurchases
                .filter(p => p.productId === product.id)
                .reduce((sum, p) => sum + p.quantity, 0);
            const sold = mockSales
                .filter(s => s.productId === product.id)
                .reduce((sum, s) => sum + s.quantity, 0);
            const returned = mockReturns
                .filter(r => r.productId === product.id)
                .reduce((sum, r) => sum + r.quantity, 0);

            // Damaged and Lost are assumed 0 for this mock
            const damaged = 0;
            const lost = 0;

            const totalQtyHeld = purchased - sold + returned - damaged - lost;

            return {
                ...product,
                purchased,
                sold,
                returned,
                damaged,
                lost,
                totalQtyHeld
            };
        });
    }, []);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">HSN</th>
                            <th className="px-6 py-3">Purchased</th>
                            <th className="px-6 py-3">Sold</th>
                            <th className="px-6 py-3">Returned</th>
                            <th className="px-6 py-3">Damaged/Lost</th>
                            <th className="px-6 py-3">Total Qty Held</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map(item => (
                            <tr key={item.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-slate-50">{item.name}</td>
                                <td className="px-6 py-4">{item.hsnCode}</td>
                                <td className="px-6 py-4 text-green-500">{item.purchased}</td>
                                <td className="px-6 py-4 text-red-500">{item.sold}</td>
                                <td className="px-6 py-4 text-sky-500">{item.returned}</td>
                                <td className="px-6 py-4 text-amber-500">{item.damaged + item.lost}</td>
                                <td className="px-6 py-4 font-bold text-slate-50">{item.totalQtyHeld}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockPage;