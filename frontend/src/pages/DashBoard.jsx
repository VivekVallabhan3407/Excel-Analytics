import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [username, setUsername] = useState('User');
  const [uploadedCount, setUploadedCount] = useState(0);
  const [chartCount, setChartCount] = useState(0);
  const [recentCharts, setRecentCharts] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);

  // Simulated data fetching
  useEffect(() => {
    // Normally you'd fetch from an API here
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };
    setUsername(user.name);

    setUploadedCount(5); // Example: fetched from backend
    setChartCount(3);
    setRecentCharts([
      { name: 'Sales Chart', date: '2025-06-15' },
      { name: 'Revenue Growth', date: '2025-06-13' },
    ]);
    setRecentFiles([
      { name: 'sales_data.xlsx', uploadedAt: '2025-06-14' },
      { name: 'employees.xlsx', uploadedAt: '2025-06-12' },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Welcome, {username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-green-600">Uploaded Files</h2>
          <p className="text-3xl">{uploadedCount}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-green-600">Charts Created</h2>
          <p className="text-3xl">{chartCount}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-green-600">Recent Charts</h2>
          <ul className="text-sm text-gray-700 mt-2">
            {recentCharts.map((chart, index) => (
              <li key={index}>{chart.name} — {chart.date}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold text-green-600">Recent Files</h2>
        <ul className="mt-2 text-sm text-gray-700">
          {recentFiles.map((file, index) => (
            <li key={index}>{file.name} — {file.uploadedAt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
