import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { FaEye, FaTrash, FaTimes, FaDownload } from 'react-icons/fa';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

const ChartHistory = () => {
  const [charts, setCharts] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);

  const fetchCharts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/charts/user-charts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sort charts by creation date (newest first)
      const sortedCharts = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setCharts(sortedCharts);
    } catch (error) {
      console.error('Failed to fetch charts', error);
    }
  };

  const deleteChart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/charts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCharts();
    } catch (err) {
      console.error('Error deleting chart', err);
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#previewModal canvas');
    if (!canvas) return alert('No chart to export');
    const link = document.createElement('a');
    link.download = `${selectedChart.chartTitle || 'chart'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    fetchCharts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Chart History</h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {charts.map((chart) => (
          <div
            key={chart._id}
            className="min-w-[280px] bg-white dark:bg-gray-800 border rounded-lg shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 truncate">{chart.fileName}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Chart:</span> {chart.chartTitle}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Type:</span> {chart.chartType}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Created:</span>{' '}
                {new Date(chart.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 border-t pt-3 flex justify-between items-center gap-2">
              <button
                onClick={() => setSelectedChart(chart)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FaEye />
                <span>View</span>
              </button>
              <button
                onClick={() => deleteChart(chart._id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedChart && (
        <div
          id="previewModal"
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-4xl p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setSelectedChart(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-lg"
            >
              <FaTimes />
            </button>

            {/* Chart Title */}
            <h3 className="text-xl font-bold mb-4 text-center">{selectedChart.chartTitle}</h3>

            {/* Chart Preview */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 max-h-[70vh] overflow-auto">
              {selectedChart.chartType.includes('3d') ? (
                <Plot data={selectedChart.config.data} layout={selectedChart.config.layout} />
              ) : selectedChart.chartType === 'bar' ? (
                <Bar data={selectedChart.config.data} />
              ) : selectedChart.chartType === 'line' ? (
                <Line data={selectedChart.config.data} />
              ) : selectedChart.chartType === 'pie' ? (
                <Pie data={selectedChart.config.data} />
              ) : (
                <Scatter data={selectedChart.config.data} />
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
              >
                <FaDownload />
                <span>Download PNG</span>
              </button>
              <button
                onClick={() => setSelectedChart(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FaTimes />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartHistory;
