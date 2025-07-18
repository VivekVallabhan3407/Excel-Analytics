import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalFiles: 0,
    totalCharts: 0,
    totalFileSize: 0,
    normalUserCount: 0,
    adminUserCount: 0
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('user');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chartTypeStats, setChartTypeStats] = useState([]);
  const [monthlyUserStats, setMonthlyUserStats] = useState([]);
  const [mostGeneratedChartType, setMostGeneratedChartType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedChartView, setSelectedChartView] = useState("byType");




  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userList = res.data;
      setUsers(userList);
      const chartStatsRes = await axios.get('/admin/chartTypeStats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChartTypeStats(chartStatsRes.data);
      const mostGenerated = chartStatsRes.data.reduce((max, item) => item.count > max.count ? item : max, chartStatsRes.data[0]);
      setMostGeneratedChartType(mostGenerated._id);

      const userStatsRes = await axios.get('/admin/userStats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMonthlyUserStats(userStatsRes.data);


      const totalUsers = userList.length;
      const activeUsers = userList.filter(u => u.active !== false).length;
      const totalFiles = userList.reduce((sum, u) => sum + (u.files || 0), 0);
      const totalCharts = userList.reduce((sum, u) => sum + (u.charts || 0), 0);
      const totalFileSize = userList.reduce((sum, u) => {
        const size = typeof u.totalSize === 'number' ? u.totalSize : 0;
        return sum + size;
      }, 0);
      const normalUserCount = userList.filter(u => u.role === 'user').length;
      const adminUserCount = userList.filter(u => u.role === 'admin').length;

      setStats({
        totalUsers,
        activeUsers,
        totalFiles,
        totalCharts,
        totalFileSize,
        normalUserCount,
        adminUserCount
      });
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartTypeStats.length > 0) {
      if (selectedChartView === "byType") {
        const labels = chartTypeStats.map(c => c._id);
        const values = chartTypeStats.map(c => c.count);

        Plotly.newPlot("chartTypePieDiv", [{
          type: "pie",
          labels,
          values,
          textinfo: "label+percent",
          hole: 0.4
        }], {
          title: "Chart Type Distribution",
          height: 400,
          showlegend: true,
          legend: { orientation: "v", x: 1, y: 0.5 },
          margin: { t: 30, r: 100, b: 30, l: 30 }
        });
      }

      if (selectedChartView === "byDimension") {
        const dimensionMap = { "2D": 0, "3D": 0 };
        chartTypeStats.forEach(item => {
          const type = item._id.toLowerCase();
          if (["bar", "line", "pie"].includes(type)) {
            dimensionMap["2D"] += item.count;
          } else {
            dimensionMap["3D"] += item.count;
          }
        });

        Plotly.newPlot("chartTypePieDiv", [{
          type: "pie",
          labels: Object.keys(dimensionMap),
          values: Object.values(dimensionMap),
          textinfo: "label+percent",
          hole: 0.4
        }], {
          title: "Chart Dimension Distribution",
          height: 400,
          showlegend: true,
          legend: { orientation: "v", x: 1, y: 0.5 },
          margin: { t: 30, r: 100, b: 30, l: 30 }
        });
      }
    }
  }, [chartTypeStats, selectedChartView]);


  useEffect(() => {
    if (monthlyUserStats.length > 0) {
      const labels = monthlyUserStats.map(item => `${item._id.month}/${item._id.year}`);
      const counts = monthlyUserStats.map(item => item.count);

      Plotly.newPlot('userGrowthLineDiv', [{
        x: labels,
        y: counts,
        type: 'bar',
        marker: { color: '#15803d' } // green-700 hex
      }], {
        title: 'Users Joined Per Month',
        height: 400,
        xaxis: { title: 'Month' },
        yaxis: { title: 'Count' },
        bargap: 0.3
      });

    }
  }, [monthlyUserStats]);


  const openRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const confirmUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/users/${selectedUser._id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Role updated to ${newRole}`);
      setShowRoleModal(false);
      fetchData();
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/admin/users/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User deleted successfully');
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(users.length / usersPerPage);

  return (

    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Panel</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="Files Uploaded" value={stats.totalFiles} />
        <StatCard label="Charts Created" value={stats.totalCharts} />
        <StatCard label="Total File Size" value={stats.totalFileSize >= 1024 * 1024 ? `${(stats.totalFileSize / (1024 * 1024)).toFixed(2)} MB` : stats.totalFileSize >= 1024 ? `${(stats.totalFileSize / 1024).toFixed(1)} KB` : `${stats.totalFileSize} Bytes`} />
        <StatCard label="Most Generated Chart" value={`${mostGeneratedChartType.charAt(0).toUpperCase() + mostGeneratedChartType.slice(1).toLowerCase()} Chart` || 'N/A'} />
        <StatCard label="Normal Users" value={stats.normalUserCount} />
        <StatCard label="Admin Users" value={stats.adminUserCount} />


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Chart Overview with dropdown */}
        <div className="bg-white p-4 rounded shadow relative">
          {/* Centered Title */}
          <h2 className="text-lg font-semibold text-green-700 text-center mb-2">Chart Overview</h2>

          {/* Right-Aligned Dropdown - safely above chart container */}
          <div className="flex justify-end mb-4 pr-1">
            <select
              value={selectedChartView}
              onChange={(e) => setSelectedChartView(e.target.value)}
              className="p-2 rounded border border-green-600"
            >
              <option value="byType">By Chart Type</option>
              <option value="byDimension">By Chart Dimension (2D vs 3D)</option>
            </select>
          </div>

          {/* Chart Rendering Canvas */}
          <div id="chartTypePieDiv" className="w-full h-[400px]"></div>
        </div>


        {/* Users Per Month Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-center text-green-700">Users Per Month</h2>
          <div id="userGrowthLineDiv" className="w-full h-[400px]"></div>
        </div>

      </div>


      {/* User Table */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Files</th>
              <th>Charts</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (

              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name ?? ''}</td>
                <td>{user.email ?? ''}</td>
                <td>{user.role ?? ''}</td>
                <td>{user.files || 0}</td>
                <td>{user.charts || 0}</td>
                <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => openRoleModal(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Showing {indexOfFirstUser + 1} to{" "}
          {Math.min(indexOfLastUser, users.length)} of {users.length} users
        </p>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400 border-gray-300" : "text-green-600 border-green-600 hover:bg-green-50"}`}
          >
            Prev
          </button>
          <span className="text-black">
            {currentPage} / {totalUserPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalUserPages}
            className={`px-3 py-1 border rounded ${currentPage === totalUserPages ? "text-gray-400 border-gray-300" : "text-green-600 border-green-600 hover:bg-green-50"}`}
          >
            Next
          </button>
        </div>
      </div>


      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Update Role</h2>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmUpdateRole}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete <span className="text-red-600">{selectedUser.name}</span>?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 shadow rounded border border-green-700 text-center transition-transform hover:bg-green-50 hover:shadow-md hover:-translate-y-1 duration-200">
    <h2 className="text-lg font-semibold text-green-700">{label}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export default AdminPanel;