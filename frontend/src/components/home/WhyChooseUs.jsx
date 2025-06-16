import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChartLine, FaHistory, FaFileExport, FaRobot, FaShieldAlt } from 'react-icons/fa';
import Container from '../ui/Container';

export default function WhyChooseUs() {
  const features = [{
    icon: <FaChartLine className="h-8 w-8 text-[#217346]" />,
    title: "Advanced Visualizations",
    description: "Interactive charts and graphs using Chart.js with customizable axes and views"
  },
  {
    icon: <FaRobot className="h-8 w-8 text-[#217346]" />,
    title: "AI-Powered Insights",
    description: "Automated data analysis and pattern detection for smarter decision making"
  },
  {
    icon: <FaHistory className="h-8 w-8 text-[#217346]" />,
    title: "Analysis History",
    description: "Track and revisit all your previous analyses in one dashboard"
  },
  {
    icon: <FaFileExport className="h-8 w-8 text-[#217346]" />,
    title: "Export Options",
    description: "Download charts and reports in PNG, PDF, or Excel formats"
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 text-[#217346]" />,
    title: "Secure Management",
    description: "JWT authentication and admin dashboard for user management"
  }
  ];


  return (
    <section className="py-20 bg-white">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-8"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 rounded-xl border hover:shadow-xl transition-all transform hover:scale-105 bg-white">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}