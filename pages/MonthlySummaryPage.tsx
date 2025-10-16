import React from 'react';

const MonthlySummaryPage: React.FC = () => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-slate-50">Monthly Summary (P&L)</h2>
            <p className="mt-2 text-slate-400">This page will show an aggregated monthly summary of sales, returns, profits, and losses for each product.</p>
        </div>
    );
};

export default MonthlySummaryPage;