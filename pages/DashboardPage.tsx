import React from 'react';
import Card from '../components/ui/Card';
import { DollarSign, RefreshCw, Box, BarChart2 } from '../components/icons';
import { mockSales, mockReturns, mockProducts, mockPurchases } from '../lib/data';
import { formatCurrency } from '../lib/utils';
import { calculateLandedCost } from '../lib/formulas';

const DashboardPage: React.FC = () => {
    const totalSalesMonth = mockSales
        .filter(s => new Date(s.saleDate).getMonth() === new Date().getMonth())
        .reduce((sum, sale) => sum + sale.salePrice * sale.quantity, 0);

    const totalReturnsMonth = mockReturns
        .filter(r => new Date(r.returnDate).getMonth() === new Date().getMonth())
        .length;

    const stockOnHand = mockProducts.reduce((total, product) => {
        const purchased = mockPurchases
            .filter(p => p.productId === product.id)
            .reduce((sum, p) => sum + p.quantity, 0);
        const sold = mockSales
            .filter(s => s.productId === product.id)
            .reduce((sum, s) => sum + s.quantity, 0);
        const returned = mockReturns
            .filter(r => r.productId === product.id)
            .reduce((sum, r) => sum + r.quantity, 0);
        return total + (purchased - sold + returned);
    }, 0);

    const netGstMtd = mockSales
        .filter(s => new Date(s.saleDate).getMonth() === new Date().getMonth())
        .reduce((total, sale) => {
            const product = mockProducts.find(p => p.id === sale.productId);
            if (!product) return total;
            const gstLevied = sale.salePrice * sale.quantity * (product.defaultGstRate / (100 + product.defaultGstRate));
            return total + gstLevied;
        }, 0)
        -
        mockPurchases
        .filter(p => new Date(p.purchaseDate).getMonth() === new Date().getMonth())
        .reduce((total, purchase) => {
            const baseValue = purchase.rate * purchase.quantity;
            const gstPaid = baseValue * (purchase.gstRate / 100);
            return total + gstPaid;
        }, 0);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    title="This Month's Sales"
                    value={formatCurrency(totalSalesMonth)}
                    icon={<DollarSign />}
                    change="+5.4%"
                    changeType="increase"
                />
                <Card
                    title="Returns This Month"
                    value={totalReturnsMonth.toString()}
                    icon={<RefreshCw />}
                    change="-1.2%"
                    changeType="decrease"
                />
                <Card
                    title="Total Stock on Hand"
                    value={`${stockOnHand} Units`}
                    icon={<Box />}
                />
                <Card
                    title="Net GST MTD"
                    value={formatCurrency(netGstMtd)}
                    icon={<BarChart2 />}
                />
            </div>

            <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-50 mb-4">Recent Sales</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order No</th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSales.slice(0, 5).map(sale => {
                                const product = mockProducts.find(p => p.id === sale.productId);
                                return (
                                    <tr key={sale.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-medium text-slate-50">{sale.saleOrderNo}</td>
                                        <td className="px-6 py-4">{product?.name}</td>
                                        <td className="px-6 py-4">{new Date(sale.saleDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{formatCurrency(sale.salePrice * sale.quantity)}</td>
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

export default DashboardPage;