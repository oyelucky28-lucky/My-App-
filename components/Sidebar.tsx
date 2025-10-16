import React from 'react';
import { cn } from '../lib/utils';
import { Page, PAGES } from '../types';
import { BarChart2, Box, DollarSign, Home, Import, Package, RefreshCw, Send, Settings, ShoppingBag, ShoppingCart, Tag } from './icons';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const navIcons: Record<Page, React.ReactNode> = {
    'Dashboard': <Home />,
    'Purchase': <ShoppingCart />,
    'Stock': <Box />,
    'Inventory': <Tag />,
    'Sales': <DollarSign />,
    'Returns': <RefreshCw />,
    'Ads Cost': <Send />,
    'Product-wise P/L': <BarChart2 />,
    'Monthly Summary': <BarChart2 />,
    'Reports': <Package />,
    'Import': <Import />,
    'Settings': <Settings />,
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <div className="w-64 bg-slate-800 shadow-md flex-shrink-0">
            <div className="flex items-center justify-center h-20 border-b border-slate-700">
                <ShoppingBag className="h-8 w-8 text-indigo-500" />
                <span className="ml-2 text-xl font-bold text-slate-50">Jayvika ERP</span>
            </div>
            <nav className="mt-5">
                {PAGES.map(page => (
                    <a
                        key={page}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                        }}
                        className={cn(
                            "flex items-center py-3 px-6 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200",
                            { "bg-slate-700/50 text-white border-r-4 border-indigo-400": currentPage === page }
                        )}
                    >
                        {navIcons[page]}
                        <span className="mx-4 font-medium">{page}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;