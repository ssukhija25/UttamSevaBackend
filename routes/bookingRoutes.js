const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/createBooking', bookingController.createBooking);

router.get('/user/:userId', bookingController.getUserBookings);

router.get('/:id', bookingController.getBookingById);

router.put('/:id/status', bookingController.updateBookingStatus);

module.exports = router;
