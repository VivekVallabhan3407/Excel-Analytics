import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Excel Analytics</strong>, a platform owned and operated by <strong>Data Crunchers</strong>. By accessing or using our services, you agree to the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Use of the Platform</h2>
      <p className="mb-4">
        You agree to use Excel Analytics only for lawful purposes. You must not misuse the platform by introducing malicious code or interfering with its functionality.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All content and features provided by Excel Analytics are the property of Data Crunchers. Do not copy, redistribute, or modify anything without permission.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Data Usage</h2>
      <p className="mb-4">
        We process your uploaded Excel files temporarily for analytics. They are not stored permanently and are deleted automatically after use.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Privacy</h2>
      <p className="mb-4">
        Please review our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a> to learn more about how we handle your data.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
      <p className="mb-4">
        Data Crunchers is not responsible for any loss or damage resulting from your use of Excel Analytics.
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms at any time. Continuing to use the platform after updates means you accept the changes.
      </p>

      <p className="mt-6 text-sm text-gray-600">
        Last updated: June 2025
      </p>
    </div>
  );
};

export default Terms;
