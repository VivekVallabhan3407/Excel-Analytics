// src/pages/ChartHistory.jsx

import React from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';

const dummyCharts = [
  {
    id: 1,
    fileName: 'sales_data.csv',
    chartName: 'Monthly Sales',
    size: '24 KB',
    createdAt: '2025-06-16 14:35',
  },
  {
    id: 2,
    fileName: 'finance_report.xlsx',
    chartName: 'Annual Growth',
    size: '48 KB',
    createdAt: '2025-06-15 11:20',
  },
  {
    id: 3,
    fileName: 'survey_results.json',
    chartName: 'User Feedback Trends',
    size: '32 KB',
    createdAt: '2025-06-14 09:10',
  },
  {
    id: 4,
    fileName: 'expenses_2025.csv',
    chartName: 'Q1 Expenses',
    size: '20 KB',
    createdAt: '2025-06-13 17:05',
  },
];

const ChartHistory = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Chart History</h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {dummyCharts.map(chart => (
          <div
            key={chart.id}
            className="min-w-[280px] bg-white dark:bg-gray-800 border rounded-lg shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 truncate">{chart.fileName}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Chart:</span> {chart.chartName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Size:</span> {chart.size}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Created:</span> {chart.createdAt}
              </p>
            </div>

            <div className="mt-4 border-t pt-3 flex justify-between items-center gap-2">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <FaEye />
                <span>View</span>
              </button>
              <button className="flex items-center gap-2 text-green-600 hover:text-green-800">
                <FaDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartHistory;
