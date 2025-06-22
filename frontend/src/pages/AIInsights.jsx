import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { jsPDF } from 'jspdf';

function AIInsights() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [insightType, setInsightType] = useState('summary');
  const [insightResult, setInsightResult] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Load user's uploaded files
    axios.get('/user/files')
      .then(res => setFiles(res.data))
      .catch(() => alert('Failed to load files'));
  }, []);

  const handleGenerate = async () => {
    if (!selectedFile) return alert('Select a file');

    if (insightType === 'summary') {
      try {
        const res = await axios.post('/ai/summary', { filename: selectedFile });
        setInsightResult(res.data.summary);
      } catch {
        alert('Failed to generate summary');
      }
    } else {
      try {
        const res = await axios.post('/ai/chart-insights', { filename: selectedFile });
        setChartData(res.data.chartData);
      } catch {
        alert('Failed to generate chart');
      }
    }
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text('AI-Powered Insights for Excel Files', 20, 20);

    // Add Insight Type (Summary or Chart)
    doc.setFontSize(12);
    doc.text('Insight Type: ' + insightType, 20, 30);

    // Add Selected File
    doc.text('Selected File: ' + selectedFile, 20, 40);

    // Add the Summary or Chart Data
    if (insightType === 'summary') {
      doc.text('Summary:', 20, 50);
      doc.text(insightResult, 20, 60, { maxWidth: 170 });
    } else if (insightType === 'chart' && chartData) {
      doc.text('Chart Data:', 20, 50);
      doc.text(JSON.stringify(chartData, null, 2), 20, 60);
    }

    // Save the PDF
    doc.save('AI_Insights.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Insights for Your Excel Data</h1>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <label className="block mb-2 font-medium">Select Uploaded File</label>
        <select
          className="border p-2 mb-4 w-full"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          <option value="">-- Choose a file --</option>
          {files.map((file, idx) => (
            <option key={idx} value={file}>{file}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Insight Type</label>
        <select
          className="border p-2 mb-4 w-full"
          value={insightType}
          onChange={(e) => setInsightType(e.target.value)}
        >
          <option value="summary">AI Summary</option>
          <option value="chart">Visual Chart Insights</option>
        </select>

        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleGenerate}
        >
          Generate Insights
        </button>

        <button
          className="ml-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={exportAsPDF}
        >
          Export as PDF
        </button>

        {/* Display Insights */}
        <div className="mt-6">
          {insightType === 'summary' && (
            <textarea
              value={insightResult}
              readOnly
              className="w-full h-40 p-4 border rounded bg-gray-50"
            />
          )}
          {insightType === 'chart' && chartData && (
            <div className="mt-4">
              {/* Replace with actual chart logic */}
              <pre>{JSON.stringify(chartData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIInsights;