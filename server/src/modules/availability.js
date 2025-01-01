const {Schema, model} = require("mongoose");

const availabilitySchema = new Schema({
    date: { type: Date, required: true },
    availableSlots: { type: [String], required: true }, 
});

const Availability =  model('Availability', availabilitySchema);
module.exports = Availability;