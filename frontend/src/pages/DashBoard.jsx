import React, { useEffect, useState } from "react";
import axios from "../services/axios";

function Dashboard() {
  const [username, setUsername] = useState("User");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [chartCount, setChartCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [lastLogin, setLastLogin] = useState("");
  const [recentCharts, setRecentCharts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const chartsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };
      setUsername(user.name);
      setLastLogin(user.lastLogin || new Date().toISOString());

      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const fileRes = await axios.get("/files/meta", { headers });
        setUploadedCount(fileRes.data.total || 0);
        const sizeBytes = fileRes.data.recent.reduce(
          (sum, file) => sum + (file.size || 0),
          0,
        );
        setTotalSize((sizeBytes / (1024 * 1024)).toFixed(2)); // In MB

        const chartRes = await axios.get("/charts/user-charts", { headers });
        setChartCount(chartRes.data.length);

        const sortedCharts = chartRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((c) => ({
            id: c._id,
            chartTitle: c.chartTitle || c.chartType,
            date: new Date(c.createdAt).toLocaleDateString(),
            fileName: c.fileName,
          }));

        setRecentCharts(sortedCharts);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastChart = currentPage * chartsPerPage;
  const indexOfFirstChart = indexOfLastChart - chartsPerPage;
  const currentCharts = recentCharts.slice(indexOfFirstChart, indexOfLastChart);
  const totalPages = Math.ceil(recentCharts.length / chartsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteChart = async (chartId) => {
    if (!window.confirm("Are you sure you want to delete this chart?")) return;

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${ token }`
    };

    await axios.delete(`/charts/${ chartId }`, { headers });

    const updatedCharts = recentCharts.filter((chart) => chart.id !== chartId);
    setRecentCharts(updatedCharts);
    setChartCount(updatedCharts.length);
  } catch (err) {
    console.error("Error deleting chart:", err);
    alert("Failed to delete chart.");
  }
};
return (
  <div className="p-6 " >
    <h1 className="text-3xl font-bold text-green-700 mb-6">
      Welcome, {username}!
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold text-green-600">
          Uploaded Files
        </h2>
        <p className="text-3xl text-black">{uploadedCount}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold text-green-600">
          Charts Created
        </h2>
        <p className="text-3xl text-black">{chartCount}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold text-green-600">
          Total File Size
        </h2>
        <p className="text-3xl text-black">{totalSize} MB</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold text-green-600">Last Login</h2>
        <p className="text-black text-base">
          {new Date(lastLogin).toLocaleString()}
        </p>
      </div>
    </div>

    <div className="bg-white shadow rounded p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold text-green-600 mb-4">
        Recent Charts
      </h2>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-green-100 text-green-700">
          <tr>
            <th className="px-4 py-2">Chart Name</th>
            <th className="px-4 py-2">File Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCharts.map((chart, index) => (
            <tr key={chart.id || index} className="border-t">
              <td className="px-4 py-2">{chart.chartTitle}</td>
              <td className="px-4 py-2">{chart.fileName}</td>
              <td className="px-4 py-2">{chart.date}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteChart(chart.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Showing {indexOfFirstChart + 1} to{" "}
          {Math.min(indexOfLastChart, recentCharts.length)} of{" "}
          {recentCharts.length} entries
        </p>
        <div className="space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400 border-gray-300" : "text-green-600 border-green-600 hover:bg-green-50"}`}
          >
            Prev
          </button>
          <span className="text-black">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? "text-gray-400 border-gray-300" : "text-green-600 border-green-600 hover:bg-green-50"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default Dashboard;
