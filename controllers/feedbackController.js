const Feedback = require('../models/Feedback');

// GET all feedback........................................................................
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user_id', 'name email').populate('provider_id', 'name');
    res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// GET feedback by provider_id...................................................
exports.getFeedbackByProvider = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ provider_id: req.params.providerId })
      .populate('user_id', 'name email')
      .populate('provider_id', 'name');

    if (feedbacks.length === 0) {
      return res.status(404).json({ success: false, message: 'No feedback found for this provider' });
    }

    res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// POST new feedback.......................................................
exports.createFeedback = async (req, res) => {
  try {
    const { feedback_id, booking_id, user_id, provider_id, rating, comments } = req.body;

    // Validation
    if (!feedback_id || !booking_id || !user_id || !provider_id || !rating) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      feedback_id,
      booking_id,
      user_id,
      provider_id,
      rating,
      comments,
      created_at: new Date()
    });

    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted', data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// DELETE feedback by ID.......................................................
exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.status(200).json({ success: true, message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
