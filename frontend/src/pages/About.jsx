import React from 'react';
import logo from '../assets/logo.png';

const About = () => {
  const coreValues = [
    "Innovation",
    "Data Integrity",
    "Transparency",
    "Collaboration"
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-left">

      {/* Company Overview */}
      <div className='flex items-center h-12 w-auto gap-4 mb-0'>
        <img src={logo} alt="Data Crunchers Logo" className="h-24 w-24 mb-4 mt-4" />
        <h2 className="text-3xl font-bold text-green-600 mb-3">About Data Crunchers</h2>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        <strong>Data Crunchers</strong> is a forward-thinking tech company developing intelligent tools
        under the <strong>Excel Analytics</strong> platform. Our mission is to empower individuals and businesses
        to make informed decisions by transforming raw Excel data into actionable insights.
        From trend identification to deep data visualizations, our intuitive solutions make data analysis
        accessible for everyone.
      </p>

      {/* Vision */}
      <h2 className="text-2xl font-bold text-green-600 mb-2">Our Vision</h2>
      <p className="text-gray-700 mb-6">
        To become a leading platform for effortless Excel-based data analytics and decision support worldwide.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-bold text-green-600 mb-2">Our Mission</h2>
      <p className="text-gray-700 mb-10">
        To deliver a seamless and intelligent experience for users to visualize, interpret, and act on Excel data
        through modern, secure, and scalable technology.
      </p>

      {/* Core Values */}
      <h2 className="text-2xl font-bold text-green-600 mb-4">Our Core Values</h2>
      <div className="flex flex-col gap-4 mb-10">
        {coreValues.map((value, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 bg-gray-100 hover:bg-green-100 transform hover:scale-[1.02] hover:shadow-md transition duration-300 ease-in-out px-4 py-3 rounded-md font-semibold text-gray-800"
          >
            {value}
          </div>
        ))}
      </div>

      Meet the Team
      <h2 className="text-2xl font-bold text-green-600 mb-4">Meet the Team</h2>
      <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full md:w-2/3">
        <h3 className="text-lg font-semibold text-gray-800">Vivek Vallabhan</h3>
        <p className="text-gray-600">Full-Stack Developer Intern</p>
        <p className="text-sm text-gray-500 mt-1">
          Handled end-to-end development of the Excel Analytics platform, including file uploads,
          chart generation, dashboard metrics, and secure admin controls.
        </p>
      </div>
    </div>
  );
};

export default About;