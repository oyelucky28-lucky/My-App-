import React from 'react';
import { mockSales, mockProducts } from '../lib/data';
import { formatCurrency, formatDate } from '../lib/utils';
import { Product, Sale } from '../types';
import { Package } from '../components/icons';

interface ProductPLData extends Sale {
    product: Product | undefined;
    profit: number;
}

const ProductPLPage: React.FC = () => {
    const plData: ProductPLData[] = mockSales.map(sale => {
        const product = mockProducts.find(p => p.id === sale.productId);
        const profit = (sale.salePrice - sale.landedCostSnapshot) * sale.quantity;
        return {
            ...sale,
            product,
            profit,
        };
    }).sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-slate-50 mb-4">Product-wise Profit &amp; Loss</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Order No</th>
                            <th scope="col" className="px-6 py-3">Sale Date</th>
                            <th scope="col" className="px-6 py-3">Sale Price</th>
                            <th scope="col" className="px-6 py-3">Landed Cost</th>
                            <th scope="col" className="px-6 py-3">Profit / Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plData.map(item => (
                            <tr key={item.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4">
                                    {item.product?.imageUrl ? (
                                        <img src={item.product.imageUrl} alt={item.product.name} className="h-12 w-12 rounded-md object-cover" />
                                    ) : (
                                        <div className="h-12 w-12 rounded-md bg-slate-700 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-slate-500" />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-50">{item.product?.name || 'N/A'}</td>
                                <td className="px-6 py-4">{item.saleOrderNo}</td>
                                <td className="px-6 py-4">{formatDate(item.saleDate)}</td>
                                <td className="px-6 py-4">{formatCurrency(item.salePrice)}</td>
                                <td className="px-6 py-4">{formatCurrency(item.landedCostSnapshot)}</td>
                                <td className={`px-6 py-4 font-bold ${item.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {formatCurrency(item.profit)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductPLPage;