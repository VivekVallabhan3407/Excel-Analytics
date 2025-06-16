import React from 'react';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Excel Data Into Powerful Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Upload your Excel files and get instant analytics, visualizations, 
              and actionable insights in seconds.
            </p>
            <Link 
              to="/signup" 
              className="inline-block bg-[#217346] hover:bg-[#1a5c38] text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
          </div>
          <div className="relative">
            <img 
              src="/excel-analytics-preview.png" 
              alt="Excel Analytics Dashboard" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}