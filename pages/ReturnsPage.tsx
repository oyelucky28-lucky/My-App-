import React from 'react';

const ReturnsPage: React.FC = () => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-slate-50">Returns</h2>
            <p className="mt-2 text-slate-400">This page will display a list of returned items and allow adding new returns. It will validate against existing Sale Order Nos.</p>
        </div>
    );
};

export default ReturnsPage;