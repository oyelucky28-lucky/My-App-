
import React from 'react';

interface PrintWrapperProps {
  children: React.ReactNode;
  title: string;
}

const PrintWrapper: React.FC<PrintWrapperProps> = ({ children, title }) => {
  return (
    <div>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-family: Verdana, sans-serif;
            font-size: 10pt;
          }
          .print-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
          }
          .print-header-logo {
            font-weight: bold;
            font-size: 14pt;
          }
          .print-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 8pt;
            border-top: 1px solid #ccc;
            padding-top: 5px;
          }
          .no-print {
            display: none !important;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        }
        @page {
          size: A4 portrait;
          margin: 20mm;
        }
      `}</style>
      <div className="print-container">
        <div className="print-header">
            <div className="print-header-logo">Jayvika Essentials</div>
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p>Date: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
        </div>
        {children}
        <div className="print-footer">
          Page <span className="page-number"></span>
        </div>
      </div>
    </div>
  );
};

export default PrintWrapper;
