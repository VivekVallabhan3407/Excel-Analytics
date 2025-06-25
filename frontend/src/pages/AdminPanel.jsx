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
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('user');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userList = res.data;
      setUsers(userList);

      const totalUsers = userList.length;
      const activeUsers = userList.filter(u => u.active !== false).length;
      const totalFiles = userList.reduce((sum, u) => sum + (u.files || 0), 0);
      const totalCharts = userList.reduce((sum, u) => sum + (u.charts || 0), 0);
      const totalFileSize = userList.reduce((sum, u) => {
        const size = typeof u.totalSize === 'number' ? u.totalSize : 0;
        return sum + size;
      }, 0);
      setStats({
        totalUsers,
        activeUsers,
        totalFiles,
        totalCharts,
        totalFileSize,
      });
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="Files Uploaded" value={stats.totalFiles} />
        <StatCard label="Charts Created" value={stats.totalCharts} />
        <StatCard label="Total File Size" value={stats.totalFileSize >= 1024 * 1024 ? `${(stats.totalFileSize / (1024 * 1024)).toFixed(2)} MB` : stats.totalFileSize >= 1024 ? `${(stats.totalFileSize / 1024).toFixed(1)} KB` : `${stats.totalFileSize} Bytes`} />

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
            {users.map((user) => (
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
  <div className="bg-white p-4 shadow rounded text-center">
    <h2 className="text-lg font-semibold">{label}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export default AdminPanel;