const { Availability, Appointment } = require("../modules/appointment");

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

// Controller function to book a slot
const bookSlot = async (req, res) => {
  try {
    const { userId, name, email, appointmentDate, slot } = req.body;

    // Check if the slot is available
    const availability = await Availability.findOne({ date: appointmentDate });

    if (!availability || !availability.availableSlots.includes(slot)) {
      return res.status(400).json({ message: 'Slot is already booked or not available' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      userId,
      name,
      email,
      appointmentDate,
      slot,
    });

    // Save the new appointment to the database
    await newAppointment.save();

    // Remove the booked slot from availability
    availability.availableSlots = availability.availableSlots.filter((s) => s !== slot);
    await availability.save();

    return res.status(200).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while booking the slot' });
  }
};

module.exports = { getAvailableSlots, bookSlot };