import React, { useState, useEffect, useRef } from 'react';
import axios from '../services/axios';
import jsPDF from 'jspdf';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Plot = createPlotlyComponent(Plotly);

export default function AnalyzeData() {
  const location = useLocation();
  const initial = location.state?.fileName || '';
  const [fileName, setFileName] = useState(initial);
  const [availableFiles, setAvailableFiles] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [chartDim, setChartDim] = useState('2d');
  const [chartType2D, setChartType2D] = useState('');
  const [chartType3D, setChartType3D] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [zAxis, setZAxis] = useState('');
  const [color, setColor] = useState('#1f77b4');
  const [chartConfig, setChartConfig] = useState(null);

  const chartRef = useRef();

  useEffect(() => {
    axios.get('/files')
      .then(res => setAvailableFiles(res.data || []))
      .catch(err => console.error('Error fetching files:', err));
  }, []);

  useEffect(() => {
    if (!fileName) return;

    axios.get(`/columns/${fileName}`)
      .then(res => setAvailableColumns(res.data || []))
      .catch(() => setAvailableColumns([]));

    axios.get(`/record-by-name/${fileName}`)
      .then(res => setTableData(res.data.data || []))
      .catch(() => setTableData([]));
  }, [fileName]);

  const handleGenerate = () => {
    if (!fileName || !xAxis || !yAxis || (chartDim === '3d' && !zAxis)) {
      toast.error('Please fill all required fields.');
      return;
    }

    const x = tableData.map(row => row[xAxis]);
    const y = tableData.map(row => row[yAxis]);
    const z = chartDim === '3d' ? tableData.map(row => row[zAxis]) : null;

    let data = [];
    let layout = {};

    if (chartDim === '2d') {
      if (chartType2D === 'pie') {
        data = [{
          type: 'pie',
          labels: x,
          values: y,
          marker: { colors: [color] }
        }];
      } else {
        data = [{
          type: chartType2D === 'line' ? 'scatter' : chartType2D,
          x,
          y,
          marker: { color }
        }];
      }

      layout = {
        title: `${chartType2D.toUpperCase()} Chart`,
        autosize: true,
        margin: { t: 40, l: 40, r: 30, b: 40 },
      };
    } else {
      data = [{
        type: 'scatter3d',
        mode: chartType3D === 'lines' ? 'lines+markers' : 'markers',
        x, y, z,
        marker: { size: 4, color }
      }];

      layout = {
        title: `${chartType3D} Chart`,
        scene: {
          xaxis: { title: xAxis },
          yaxis: { title: yAxis },
          zaxis: { title: zAxis }
        },
        height: 450,
        width: 600,
        margin: { t: 30, l: 30, r: 30, b: 30 }
      };
    }

    setChartConfig({ data, layout });
  };

  const handleClear = () => {
    setXAxis('');
    setYAxis('');
    setZAxis('');
    setColor('#1f77b4');
    setChartType2D('');
    setChartType3D('');
    setChartDim('2d');
    setChartConfig(null);
  };

  const handleSave = async () => {
    if (!chartConfig) {
      toast.error('Generate chart first');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post('/charts/save-chart', {
        fileName,
        xAxis,
        yAxis,
        zAxis: chartDim === '3d' ? zAxis : '',
        chartType: chartDim === '2d' ? chartType2D : chartType3D,
        color,
        chartTitle: `${chartDim.toUpperCase()} - ${chartDim === '2d' ? chartType2D : chartType3D}`,
        chartData: chartConfig
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Chart saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Error saving chart');
    }
  };

  const handleExport = (format) => {
    const validFormats = ['png', 'jpeg', 'webp', 'svg'];
    const chartElement = chartRef.current?.el;

    if (!chartElement) {
      toast.error('Chart not found');
      return;
    }
    // For image export (png, jpeg, etc.)
    if (validFormats.includes(format)) {
      Plotly.toImage(chartElement, {
        format,
        width: 700,
        height: chartDim === '3d' ? 500 : 400
      }).then(imgData => {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `chart.${format}`;
        a.click();
      }).catch(err => {
        console.error('Export failed:', err);
        toast.error('Export failed');
      });
    }

    // For PDF export
    else if (format === 'pdf') {
      Plotly.toImage(chartElement, {
        format: 'png', // generate PNG first, convert to PDF
        width: 700,
        height: chartDim === '3d' ? 500 : 400
      }).then(imgData => {
        const pdf = new jsPDF({ orientation: 'landscape' });
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
        pdf.save('chart.pdf');
      }).catch(err => {
        console.error('PDF Export failed:', err);
        toast.error('PDF Export failed');
      });
    }

    // Invalid format
    else {
      toast.error('Invalid export format');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Analyze Your Data</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label>File Name</label>
            <select value={fileName} onChange={e => setFileName(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {availableFiles.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div>
            <label>X Axis</label>
            <select value={xAxis} onChange={e => setXAxis(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {availableColumns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label>Y Axis</label>
            <select value={yAxis} onChange={e => setYAxis(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {availableColumns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {chartDim === '3d' && (
            <div>
              <label>Z Axis</label>
              <select value={zAxis} onChange={e => setZAxis(e.target.value)} className="w-full border p-2 rounded">
                <option value="">Select</option>
                {availableColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}

          <div className="flex gap-4">
            <label><input type="radio" value="2d" checked={chartDim === '2d'} onChange={() => setChartDim('2d')} /> 2D</label>
            <label><input type="radio" value="3d" checked={chartDim === '3d'} onChange={() => setChartDim('3d')} /> 3D</label>
          </div>

          <div>
            <label>Chart Type</label>
            <select value={chartDim === '2d' ? chartType2D : chartType3D} onChange={e => chartDim === '2d' ? setChartType2D(e.target.value) : setChartType3D(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {chartDim === '2d' ? (
                <>
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="pie">Pie</option>
                </>
              ) : (
                <>
                  <option value="scatter3d">3D Scatter</option>
                  <option value="lines">3D Lines</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label>Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full" />
          </div>

          <div className="flex gap-80">
            <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
            <button onClick={handleClear} className="bg-red-500 text-white px-4 py-2 rounded">Clear</button>
          </div>
        </div>

        {/* Chart View */}
        <div id="chartContainer" className="bg-white p-6 rounded shadow flex flex-col items-center justify-center w-full h-[500px] overflow-hidden">
          {!chartConfig ? (
            <p className="text-gray-400">Chart will appear here</p>
          ) : (
            <>
              <div id="chartContainer" className="w-full h-full">
                <Plot
                  ref={chartRef}
                  data={chartConfig.data}
                  layout={chartConfig.layout}
                  config={{ responsive: true }}
                  useResizeHandler
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => handleExport('png')} className="bg-purple-600 text-white px-4 py-2 rounded">Export PNG</button>
                <button onClick={() => handleExport('pdf')} className="bg-red-600 text-white px-4 py-2 rounded">Export PDF</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
