import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Page } from '../types';

interface LayoutProps {
    children: React.ReactNode;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
    return (
        <div className="flex h-screen bg-slate-900">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentPage={currentPage} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;