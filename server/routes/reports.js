const express = require('express');
const router = express.Router();
const generateMockReports = require('../utils/generateMockData');

// Generate mock data
const reports = generateMockReports(15);

// Get all reports
router.get('/', (req, res) => {
  // Simulate API delay
  setTimeout(() => {
    res.json(reports);
  }, 300);
});

// Get single report
router.get('/:id', (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  // Simulate API delay
  setTimeout(() => {
    res.json(report);
  }, 200);
});

module.exports = router;