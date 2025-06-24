import React, { useEffect, useState ,useRef} from 'react';
import axios from '../services/axios';
import { FaEye, FaTrash, FaTimes, FaDownload } from 'react-icons/fa';
import Plot from 'react-plotly.js';
import jsPDF from 'jspdf';
import Plotly from 'plotly.js-dist-min';

const ChartHistory = () => {
  const [charts, setCharts] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const chartRef = useRef();
  const fetchCharts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/charts/user-charts', {
        headers: { Authorization: `Bearer ${token} ` },
      });

      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCharts(sorted);
    } catch (err) {
      console.error('Error fetching charts:', err);
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
      console.error('Error deleting chart:', err);
    }
  };

 const handleDownload = () => {
  if (!chartRef.current || !chartRef.current.el) {
    return alert('Chart not rendered yet');
  }

  Plotly.toImage(chartRef.current.el, {
    format: 'png',
    width: 700,
    height: 500,
  }).then((imgData) => {
    const pdf = new jsPDF({ orientation: 'landscape' });
    pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
    pdf.save(`${selectedChart.chartTitle || 'chart'}.pdf`);
  }).catch((err) => {
    console.error('Export failed:', err);
    alert('Export failed');
  });
};

  useEffect(() => {
    fetchCharts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Chart History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {charts.map(chart => (
          <div key={chart._id} className="min-w-[280px] bg-white border rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2 truncate">{chart.fileName}</h3>
            <p><strong>Chart:</strong> {chart.chartTitle}</p>
            <p><strong>Type:</strong> {chart.chartType}</p>
            <p><strong>X Axis:</strong> {chart.xAxis}</p>
            <p><strong>Y Axis:</strong> {chart.yAxis}</p>
            {chart.zAxis && <p><strong>Z Axis:</strong> {chart.zAxis}</p>}
            <p><strong>Created:</strong> {new Date(chart.createdAt).toLocaleString()}</p>
            <div className="mt-4 flex justify-between items-center">
              <button onClick={() => setSelectedChart(chart)} className="text-blue-600 flex items-center gap-2"><FaEye /> View</button>
              <button onClick={() => deleteChart(chart._id)} className="text-red-600 flex items-center gap-2"><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selectedChart && (
        <div id="previewModal" className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
            <button onClick={() => setSelectedChart(null)} className="absolute top-3 right-3 text-lg text-gray-600 hover:text-red-600"><FaTimes /></button>
            <h3 className="text-xl font-bold mb-4 text-center">{selectedChart.chartTitle}</h3>
            <div className="bg-gray-100 rounded p-4 max-h-[70vh] overflow-auto">
              <Plot id="chartPreview" ref={chartRef} data={selectedChart.chartData.data} layout={selectedChart.chartData.layout} />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaDownload /> Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartHistory;