import React, { useState } from 'react';
import Container from '../ui/Container';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I upload Excel files?",
      answer: "Simply drag and drop your Excel file or click the upload button on your dashboard. We support .xlsx and .xls formats."
    },
    {
      question: "What types of charts can I create?",
      answer: "Create bar charts, line graphs, pie charts, and more with our Chart.js integration. Customize axes and appearances easily."
    },
    {
      question: "Can I save my analysis history?",
      answer: "Yes! All your analyses are automatically saved and can be accessed from your dashboard's history section."
    },
    {
      question: "How do I export my charts?",
      answer: "Use the export button to download your charts as PNG, PDF, or save the data back to Excel format."
    },
    {
      question: "Is there an admin dashboard?",
      answer: "Yes, administrators have access to a special dashboard for user management and system statistics."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <span className="text-[#217346] ml-4">
                    {openIndex === index ? (
                      <FaMinus className="h-4 w-4" />
                    ) : (
                      <FaPlus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openIndex === index 
                      ? 'max-h-48 py-4 opacity-100' 
                      : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 text-left">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}