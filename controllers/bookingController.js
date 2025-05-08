const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// Create a new booking..................................................
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      providerId,
      addressId,
      scheduledAt,
      description,
    } = req.body;

    const booking = new Booking({
      userId,
      serviceId,
      providerId,
      addressId,
      scheduledAt,
      description,
      status: "Pending", // default status
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: "Booking failed", details: error.message });
  }
};

// Get a booking by ID.....................................................
const getBookingById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findById(id)
      .populate("userId", "name email")
      .populate("serviceId", "name price")
      .populate("providerId", "name")
      .populate("addressId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch booking", details: error.message });
  }
};

// Update booking status................................... ..................
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update booking", details: error.message });
  }
};

// Get all bookings by user.................................................... ...............
const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const bookings = await Booking.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user bookings", details: error.message });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updateBookingStatus,
  getUserBookings,
};
