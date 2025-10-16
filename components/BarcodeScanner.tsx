import React, { useState, useEffect } from 'react';
import { Camera } from './icons';
import Button from './ui/Button';

interface BarcodeScannerProps {
    onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        // Fix: The browser's `setTimeout` returns a numeric ID, not a `NodeJS.Timeout` object.
        // This refactors the effect to only create and clear the timer when scanning is active,
        // which resolves the type error and improves the hook's logic.
        if (isScanning) {
            const timer = setTimeout(() => {
                const mockBarcode = `AWB${Math.floor(100000000 + Math.random() * 900000000)}`;
                onScan(mockBarcode);
                setIsScanning(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isScanning, onScan]);


    const handleScanClick = () => {
        setIsScanning(true);
        // In a real app, you would initialize the camera here.
        // For example: navigator.mediaDevices.getUserMedia({ video: true })
    };

    if (!isScanning) {
        return (
            <Button type="button" variant="secondary" onClick={handleScanClick} leftIcon={<Camera />}>
                Scan
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-8 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-4">Simulating Barcode Scan...</h3>
                <div className="relative w-64 h-48 bg-gray-900 rounded-md overflow-hidden mx-auto">
                    {/* Fake camera view */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 animate-scan"></div>
                </div>
                <p className="mt-4 text-sm text-slate-400">Please point the camera at a barcode.</p>
                <Button variant="danger" className="mt-4" onClick={() => setIsScanning(false)}>
                    Cancel
                </Button>
            </div>
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-96px); }
                    100% { transform: translateY(96px); }
                }
                .animate-scan {
                    animation: scan 1.5s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default BarcodeScanner;