import React, { useState } from 'react';

const LanguageSelect = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  const handleChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="border rounded px-3 py-2 w-full"
    >
      <option>English</option>
      <option>Hindi</option>
      <option>Chinese</option>
      <option>French</option>
    </select>
  );
};

export default LanguageSelect;
