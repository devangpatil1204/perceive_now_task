require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const reportsRouter = require('./routes/reports');
const feedbackRouter = require('./routes/feedback');
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/reports', authMiddleware('viewer'), reportsRouter);
app.use('/feedback', authMiddleware('reviewer'), feedbackRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 Using auth tokens:
  Viewer: ${process.env.VIEWER_TOKEN}
  Reviewer: ${process.env.REVIEWER_TOKEN}`);
});