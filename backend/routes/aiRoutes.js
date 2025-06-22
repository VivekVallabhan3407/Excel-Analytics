const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Summary Route
router.post('/summary', async (req, res) => {
  const { filename } = req.body;
  const filepath = path.join(__dirname, '..', 'uploads', filename);
  try {
    const rawData = fs.readFileSync(filepath, 'utf-8');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(`Summarize this Excel data:\n\n${rawData}`);
    const response = await result.response;
    const text = response.text();
    res.json({ summary: text });
  } catch (err) {
    res.status(500).json({ message: 'AI summary generation failed' });
  }
});

// Chart Insights Route
router.post('/chart-insights', async (req, res) => {
  const { filename } = req.body;
  const filepath = path.join(__dirname, '..', 'uploads', filename);
  try {
    const rawData = fs.readFileSync(filepath, 'utf-8');
    // Placeholder for chart data processing (e.g., using a charting library)
    res.json({ chartData: { x: ['Jan', 'Feb'], y: [120, 150] } });
  } catch (err) {
    res.status(500).json({ message: 'Chart insight failed' });
  }
});

module.exports = router;