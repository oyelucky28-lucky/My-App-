import React from 'react';
import { Page } from '../types';
import { Bell, UserCircle } from './icons';

interface HeaderProps {
    currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b-2 border-slate-700">
            <h1 className="text-2xl font-semibold text-slate-50">{currentPage}</h1>
            <div className="flex items-center">
                <button className="text-slate-400 hover:text-slate-200 focus:outline-none mx-4">
                    <Bell />
                </button>
                <div className="flex items-center">
                    <span className="text-right mr-3">
                        <p className="text-sm font-medium text-slate-100">Admin User</p>
                        <p className="text-xs text-slate-400">Administrator</p>
                    </span>
                    <UserCircle className="h-8 w-8 text-slate-400" />
                </div>
            </div>
        </header>
    );
};

export default Header;