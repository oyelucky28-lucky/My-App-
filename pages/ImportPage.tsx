import React, { useState } from 'react';
import Button from '../components/ui/Button';

const ImportPage: React.FC = () => {
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    const handleImport = () => {
        if (!fileName) {
            setStatus('Please select a file first.');
            return;
        }
        setStatus(`Simulating import for ${fileName}...`);
        setTimeout(() => {
            setStatus(`Successfully imported data from ${fileName}. Ingestion batch logged.`);
        }, 2000);
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-slate-50 mb-4">Import Data</h2>
            <p className="text-sm text-slate-400 mb-6">Upload your Excel (XLSX, CSV) files for Purchase (Sheet 1) and Listing Price (Sheet 2). The app will ingest the data without overwriting your original files.</p>
            
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <label htmlFor="file-upload" className="cursor-pointer text-indigo-400 font-medium">
                    {fileName ? `Selected: ${fileName}` : 'Choose a file to upload'}
                </label>
            </div>
            
            <div className="mt-6 flex justify-end">
                <Button onClick={handleImport}>
                    Import Data
                </Button>
            </div>

            {status && <p className="mt-4 text-sm text-slate-300 bg-slate-700/50 p-3 rounded-md">{status}</p>}
        </div>
    );
};

export default ImportPage;