const { Schema, model } = require("mongoose");

// Appointment schema
const appointmentSchema = new Schema({
    userName: { type: String, required: true, unique: true }, 
    appointmentDate: { type: Date, required: true },
    slot: { type: String, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
});

// Availability schema
const availabilitySchema = new Schema({
    date: { type: Date, required: true },
    availableSlots: { type: [String], required: true },
});

const Appointment = model('Appointment', appointmentSchema);
const Availability = model('Availability', availabilitySchema);

module.exports = { Appointment, Availability };