import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUpload,
  FaChartLine,
  FaHistory,
  FaRobot,
  FaSignOutAlt,
  FaTools,
} from 'react-icons/fa';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: FaHome },
    { to: '/upload', label: 'Upload Excel', icon: FaUpload },
    { to: '/analyze', label: 'Analyze Data', icon: FaChartLine },
    { to: '/history', label: 'Chart History', icon: FaHistory },
    { to: '/insights', label: 'AI Insights', icon: FaRobot },
    { to: '/settings', label: 'Settings', icon: FaTools },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-60 bg-green-700 text-white flex flex-col">
      {/* Logo and Company Name */}
      <div className="flex items-center space-x-2 p-4 text-xl font-bold">
        <img
          src={logo}
          alt="Logo"
          className="w-6 h-6 bg-white rounded-sm"
        />
        <span>Data Crunchers</span>
      </div>

      {/* Sidebar Nav */}
      <nav className="flex-1 text-base font-semibold">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 hover:bg-green-600 space-x-3 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            <Icon className="text-white text-lg" />
            <span>{label}</span>
          </NavLink>
        ))}

        {/* Show Admin Panel only if role is admin */}
        {role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 hover:bg-green-600 space-x-3 ${isActive ? 'bg-green-800' : ''}`
            }
          >
            <FaTools className="text-white text-lg" />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 hover:bg-green-600 space-x-3 text-left w-full text-base font-semibold"
      >
        <FaSignOutAlt className="text-white text-lg" />
        <span>Logout</span>
      </button>
    </div>
  );
}
