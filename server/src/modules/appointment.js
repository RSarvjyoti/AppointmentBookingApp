const {Schema, model} = require("mongoose");

const appointmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    slot: { type: String, required: true }, 
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
});

const Appointment = model('Appointment', appointmentSchema);
module.exports = Appointment;