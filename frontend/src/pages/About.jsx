import React from 'react';
import logo from '../assets/logo.png'; // Make sure this file exists

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <img src={logo} alt="Data Crunchers Logo" className="w-24 mx-auto mb-4" />
      <h2 className="text-3xl font-bold mb-4">About Data Crunchers</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        <strong>Data Crunchers</strong> is a forward-thinking tech company building intelligent tools
        under the platform <strong>Excel Analytics</strong>. We empower users to visualize, analyze, and interpret their
        Excel datasets with ease. Whether you're extracting trends or making data-driven decisions, our tools
        simplify the process with intuitive interfaces and smart features.
      </p>
    </div>
  );
};

export default About;
