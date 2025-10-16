import React from 'react';

const SettingsPage: React.FC = () => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-slate-50">Settings</h2>
            <p className="mt-2 text-slate-400">This page will contain forms to configure company profile, default values (GST, margins), user roles, and import mappings.</p>
        </div>
    );
};

export default SettingsPage;