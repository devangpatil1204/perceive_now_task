const express = require('express');
const router = express.Router();

// Store feedback in memory (production would use database)
const feedbackStore = [];

router.post('/', (req, res) => {
  const { reportId, userComment, flaggedSection } = req.body;
  
  if (!reportId || !userComment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newFeedback = {
    id: `feedback-${Date.now()}`,
    reportId,
    userComment,
    flaggedSection: flaggedSection || null,
    submittedBy: req.user.id,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  feedbackStore.push(newFeedback);
  
  console.log('📬 New feedback received:', newFeedback);
  
  res.status(201).json({
    message: 'Feedback submitted successfully',
    feedback: newFeedback
  });
});

module.exports = router;