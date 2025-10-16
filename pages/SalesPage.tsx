import React, { useState } from 'react';
import { mockProducts, mockSales } from '../lib/data';
import { formatCurrency, formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import { PlusCircle } from '../components/icons';
import BarcodeScanner from '../components/BarcodeScanner';
import { Sale, Product } from '../types';

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>(mockSales);
    const [products] = useState<Product[]>(mockProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSale, setNewSale] = useState<Partial<Sale>>({
        saleDate: new Date().toISOString().split('T')[0],
        quantity: 1
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSale(prev => ({ ...prev, [name]: value }));
    };

    const handleAwbScan = (barcode: string) => {
        setNewSale(prev => ({ ...prev, awbNo: barcode }));
    };
    
    const handlePacketIdScan = (barcode: string) => {
        setNewSale(prev => ({ ...prev, packetId: barcode }));
    };

    const handleAddSale = () => {
        // Basic validation
        if (!newSale.productId || !newSale.saleOrderNo || !newSale.salePrice) {
            alert('Please fill all required fields');
            return;
        }
        const finalSale: Sale = {
            id: `sale-${Date.now()}`,
            landedCostSnapshot: products.find(p => p.id === newSale.productId)?.packagingCharge || 0, // Simplified
            ...newSale
        } as Sale;

        setSales(prev => [finalSale, ...prev]);
        setIsModalOpen(false);
        setNewSale({ saleDate: new Date().toISOString().split('T')[0], quantity: 1 });
    };

    const inputClasses = "mt-1 block w-full rounded-md border-slate-600 bg-slate-700 shadow-sm p-2 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusCircle />}>
                    Add Sale
                </Button>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700">
                            <tr>
                                <th className="px-6 py-3">Order No</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Sale Date</th>
                                <th className="px-6 py-3">Qty</th>
                                <th className="px-6 py-3">Sale Price</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">AWB No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => {
                                const product = products.find(p => p.id === sale.productId);
                                return (
                                    <tr key={sale.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-medium text-slate-50">{sale.saleOrderNo}</td>
                                        <td className="px-6 py-4">{product?.name}</td>
                                        <td className="px-6 py-4">{formatDate(sale.saleDate)}</td>
                                        <td className="px-6 py-4">{sale.quantity}</td>
                                        <td className="px-6 py-4">{formatCurrency(sale.salePrice)}</td>
                                        <td className="px-6 py-4">{formatCurrency(sale.salePrice * sale.quantity)}</td>
                                        <td className="px-6 py-4">{sale.awbNo}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
                    <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-6 text-slate-50">Add New Sale</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300">Product</label>
                                <select name="productId" onChange={handleInputChange} className={inputClasses}>
                                    <option>Select a product</option>
                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Sale Order No</label>
                                <input type="text" name="saleOrderNo" onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Sale Date</label>
                                <input type="date" name="saleDate" value={newSale.saleDate} onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Quantity</label>
                                <input type="number" name="quantity" value={newSale.quantity} onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Sale Price (per unit)</label>
                                <input type="number" name="salePrice" onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">AWB No</label>
                                <div className="flex items-center space-x-2">
                                    <input type="text" name="awbNo" value={newSale.awbNo || ''} onChange={handleInputChange} className={inputClasses} />
                                    <BarcodeScanner onScan={handleAwbScan} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Packet ID</label>
                                <div className="flex items-center space-x-2">
                                    <input type="text" name="packetId" value={newSale.packetId || ''} onChange={handleInputChange} className={inputClasses} />
                                    <BarcodeScanner onScan={handlePacketIdScan} />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-300">Dispatch Date</label>
                                <input type="date" name="dispatchDate" value={newSale.dispatchDate} onChange={handleInputChange} className={inputClasses} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-300">Bank Transfer Amount</label>
                                <input type="number" name="bankTransferAmount" onChange={handleInputChange} className={inputClasses} />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-3">
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddSale}>Add Sale</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesPage;