const Appointment = require("../modules/appointment");
const Availability = require("../modules/availability");
// Get Available Slots
const getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const dateObj = new Date(date);
    const availability = await Availability.findOne({ date: dateObj });

    if (!availability) {
      return res
        .status(404)
        .json({ message: "No available slots for the given date." });
    }

    const availableSlots = availability.availableSlots;

    // Check booked appointments for the date
    const bookedAppointments = await Appointment.find({
      appointmentDate: dateObj,
    });

    // Create a set of booked slots
    const bookedSlots = new Set(
      bookedAppointments.map((appointment) => appointment.slot)
    );

    // Prepare the slots with status
    const slotsWithStatus = availableSlots.map((slot) => ({
      slot,
      status: bookedSlots.has(slot) ? "booked" : "available",
    }));

    return res.json({ date, slots: slotsWithStatus });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Book a Slot
const bookSlot = async (req, res) => {
  const { date, slot, userId } = req.body;

  if (!date || !slot || !userId) {
    return res
      .status(400)
      .json({ message: "Date, slot, and userId are required" });
  }

  try {
    const dateObj = new Date(date);

    // Check if the slot is available for the given date
    const availability = await Availability.findOne({ date: dateObj });

    if (!availability) {
      return res
        .status(404)
        .json({ message: "No available slots for the given date." });
    }

    // Check if the slot is available
    if (!availability.availableSlots.includes(slot)) {
      return res.status(400).json({ message: "Slot is not available." });
    }

    // Check if the slot is already booked
    const existingBooking = await Appointment.findOne({
      appointmentDate: dateObj,
      slot,
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Create a new booking
    const newBooking = new Appointment({
      userId,
      appointmentDate: dateObj,
      slot,
    });

    await newBooking.save();

    // Remove the booked slot from the availableSlots array
    await Availability.updateOne(
      { date: dateObj },
      { $pull: { availableSlots: slot } }
    );

    return res.json({
      message: "Booking successful",
      appointmentId: newBooking._id,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAvailableSlots, bookSlot };
