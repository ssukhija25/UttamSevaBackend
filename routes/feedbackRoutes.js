const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController');

router.get('/feedback', controller.getAllFeedback);
router.get('/provider/:providerId', controller.getFeedbackByProvider);
router.post('/feedbackCreate', controller.createFeedback);
router.delete('/:id', controller.deleteFeedback);

module.exports = router;
