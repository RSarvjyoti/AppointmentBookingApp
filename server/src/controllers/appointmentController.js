const {Availability, Appointment} = require("../modules/appointment")
// Get available slots
const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query; 

    if (!date) {
      return res.status(400).json({ message: 'Date query parameter is required' });
    }

    const availability = await Availability.findOne({ date });

    if (availability) {
      return res.status(200).json({ availableSlots: availability.availableSlots });
    } else {
      return res.status(404).json({ message: 'No availability found for this date' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching available slots' });
  }
};

// Book a slot
const bookSlot = async (req, res) => {
  try {
    const { userName, appointmentDate, slot } = req.body;

    const availability = await Availability.findOne({ date: appointmentDate });

    if (!availability || !availability.availableSlots.includes(slot)) {
      return res.status(400).json({ message: 'Slot is already booked or not available' });
    }

    // Check if user already exists
    const existingAppointment = await Appointment.findOne({ userName });
    if (existingAppointment) {
      return res.status(400).json({ message: 'User already has a booked appointment' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      userName,
      appointmentDate,
      slot,
    });

    await newAppointment.save();

    // Update availability
    availability.availableSlots = availability.availableSlots.filter((s) => s !== slot);
    await availability.save();

    return res.status(200).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while booking the slot' });
  }
};

module.exports = { getAvailableSlots, bookSlot };