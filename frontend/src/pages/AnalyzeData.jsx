import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const AnalyzeData = () => {
  const [fileName, setFileName] = useState('');
  const [availableFiles, setAvailableFiles] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);

  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartDim, setChartDim] = useState('2d');
  const [chart2D, setChart2D] = useState('');
  const [chart3D, setChart3D] = useState('');
  const [color, setColor] = useState('');

  // Fetch available uploaded files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('/files');
        setAvailableFiles(res.data.files || []);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  // Fetch columns when a file is selected
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await axios.get(/columns/${fileName});
        setAvailableColumns(res.data.columns || []);
      } catch (error) {
        console.error('Error fetching columns:', error);
        setAvailableColumns([]);
      }
    };

    if (fileName) {
      fetchColumns();
    }
  }, [fileName]);

  const handleReset = () => {
    setXAxis('');
    setYAxis('');
    setChartDim('2d');
    setChart2D('');
    setChart3D('');
    setColor('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Analyze Your Data</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-md w-full lg:w-1/2">

          {/* File Selector */}
          <div className="mb-4">
            <label className="block font-medium mb-1">File Name</label>
            <select
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
            >
              <option value="">Select file</option>
              {availableFiles.map((file, idx) => (
                <option key={idx} value={file}>{file}</option>
              ))}
            </select>
          </div>

          {/* X Axis */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Select X-Axis</label>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select column</option>
              {availableColumns.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Y Axis */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Y-Axis</label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select column</option>
              {availableColumns.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Chart Type Selection */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Chart Dimension</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="2d"
                  checked={chartDim === '2d'}
                  onChange={(e) => setChartDim(e.target.value)}
                />
                <span className="ml-2">2D</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="3d"
                  checked={chartDim === '3d'}
                  onChange={(e) => setChartDim(e.target.value)}
                />
                <span className="ml-2">3D</span>
              </label>
            </div>
          </div>

          {/* 2D Chart Options */}
          {chartDim === '2d' && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Select 2D Chart Type</label>
              <select
                value={chart2D}
                onChange={(e) => setChart2D(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="scatter">Scatter Plot</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>
          )}

          {/* 3D Chart Options */}
          {chartDim === '3d' && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Select 3D Chart Type</label>
              <select
                value={chart3D}
                onChange={(e) => setChart3D(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="3dbar">3D Bar Chart</option>
                <option value="surface">Surface Plot</option>
                <option value="bubble">3D Bubble Chart</option>
              </select>
            </div>
          )}

          {/* Color Theme */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Color Theme</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Default</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Generate Chart
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-md w-full lg:w-1/2 flex flex-col">
          <div className="mb-4">
            <div className="text-xl font-semibold mb-2">Chart Title (Legend Here)</div>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
              Chart will render here
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Chart</button>
            <div className="flex gap-2">
              <select className="border rounded px-3 py-2">
                <option value="pdf">Export as PDF</option>
                <option value="png">Export as PNG</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeData;