import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="hidden"
      />
      <div
        className={`w-10 h-5 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`}
        ></div>
      </div>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </label>
  );
};

export default ThemeToggle;
