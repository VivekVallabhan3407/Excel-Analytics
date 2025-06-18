import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelect from '../components/LanguageSelect';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Theme Setting */}
      <div className="flex items-center justify-between border rounded p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-lg">🌓</span>
          <span className="font-medium">Theme</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Language Setting */}
      <div className="flex items-center justify-between border rounded p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-lg">🌐</span>
          <span className="font-medium">Language</span>
        </div>
        <LanguageSelect />
      </div>

      {/* Terms & Conditions */}
      <div
        onClick={() => navigate('/terms')}
        className="cursor-pointer flex items-center justify-between border rounded p-4 shadow-sm hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📄</span>
          <span className="font-medium text-black">Terms & Conditions</span>
        </div>
        <span className="text-lg text-black">↗</span>
      </div>
    </div>
  );
};

export default Settings;
