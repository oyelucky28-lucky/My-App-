import React, { useState } from 'react';
import Button from '../components/ui/Button';
import PrintWrapper from '../components/PrintWrapper';
import { mockSales, mockProducts } from '../lib/data';
import { formatCurrency, formatDate } from '../lib/utils';
import { Sale, Product } from '../types';

const SalesReport: React.FC<{ sales: Sale[], products: Product[] }> = ({ sales, products }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                <tr>
                    <th className="px-6 py-3">Sale Date</th>
                    <th className="px-6 py-3">Order No</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Qty</th>
                    <th className="px-6 py-3">Unit Price</th>
                    <th className="px-6 py-3">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    const product = products.find(p => p.id === sale.productId);
                    return (
                        <tr key={sale.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                            <td className="px-6 py-4">{formatDate(sale.saleDate)}</td>
                            <td className="px-6 py-4 font-medium text-slate-50">{sale.saleOrderNo}</td>
                            <td className="px-6 py-4">{product?.name}</td>
                            <td className="px-6 py-4">{sale.quantity}</td>
                            <td className="px-6 py-4">{formatCurrency(sale.salePrice)}</td>
                            <td className="px-6 py-4">{formatCurrency(sale.salePrice * sale.quantity)}</td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr className="font-semibold text-slate-50 bg-slate-700">
                    <td colSpan={5} className="px-6 py-3 text-right">Total Sales</td>
                    <td className="px-6 py-3">{formatCurrency(sales.reduce((acc, s) => acc + s.salePrice * s.quantity, 0))}</td>
                </tr>
            </tfoot>
        </table>
    </div>
);


const ReportsPage: React.FC = () => {
    const [startDate, setStartDate] = useState('2023-10-01');
    const [endDate, setEndDate] = useState('2023-11-30');

    const filteredSales = mockSales.filter(sale => {
        const saleDate = new Date(sale.saleDate);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });

    const handlePrint = () => {
        window.print();
    };
    
    const inputClasses = "mt-1 block w-full rounded-md border-slate-600 bg-slate-700 shadow-sm p-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

    return (
        <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-sm no-print">
                <h2 className="text-xl font-semibold text-slate-50 mb-4">Sales Report</h2>
                <div className="flex items-center space-x-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-300">Start Date</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-slate-300">End Date</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputClasses} />
                    </div>
                    <div className="pt-6">
                        <Button onClick={handlePrint}>Print Report</Button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
                <PrintWrapper title="Sales Report">
                    <SalesReport sales={filteredSales} products={mockProducts} />
                </PrintWrapper>
            </div>
             <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-400">Profit, Loss, Returns, and Tax reports would be available here.</p>
            </div>
        </div>
    );
};

export default ReportsPage;