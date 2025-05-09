const mongoose = require('mongoose');

//unique booking ID................................................... 
const generateBookingId = () => `book-${Math.random().toString(36).substring(2, 12)}`;

const BookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    default: generateBookingId,
    unique: true,
    index: true, 
  },
  userId: {
    type:String,
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: false,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000, // Optional: Limit description length
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});


module.exports = mongoose.model('Booking', BookingSchema);
// module.exports = BookingSchema;
// };
