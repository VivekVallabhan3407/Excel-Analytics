import { useNavigate } from "react-router-dom";

export default function DashBoardNavbar({ username }) {
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4">
      <div className="text-lg font-semibold text-[#217346]">Excel Analytics Dashboard</div>
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate('/profile')}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {username?.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-800 font-medium">{username}</span>
      </div>
    </div>
  );
}
