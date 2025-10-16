
import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import PurchasePage from './pages/PurchasePage';
import StockPage from './pages/StockPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import ReturnsPage from './pages/ReturnsPage';
import AdsCostPage from './pages/AdsCostPage';
import ProductPLPage from './pages/ProductPLPage';
import MonthlySummaryPage from './pages/MonthlySummaryPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ImportPage from './pages/ImportPage';
import { Page } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <DashboardPage />;
            case 'Purchase':
                return <PurchasePage />;
            case 'Stock':
                return <StockPage />;
            case 'Inventory':
                return <InventoryPage />;
            case 'Sales':
                return <SalesPage />;
            case 'Returns':
                return <ReturnsPage />;
            case 'Ads Cost':
                return <AdsCostPage />;
            case 'Product-wise P/L':
                return <ProductPLPage />;
            case 'Monthly Summary':
                return <MonthlySummaryPage />;
            case 'Reports':
                return <ReportsPage />;
            case 'Settings':
                return <SettingsPage />;
            case 'Import':
                return <ImportPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
            {renderPage()}
        </Layout>
    );
};

export default App;
