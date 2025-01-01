import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SlotCard from './SlotCard';

const BookingPage = () => {
  const { userName } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`/api/slots?date=${selectedDate}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleSlotSelection = async (slot) => {
    try {
      const response = await axios.post('/api/bookSlot', {
        userId: userName,
        name: userName,
        email: `${userName}@example.com`,
        appointmentDate: selectedDate,
        slot: slot,
      });
      setBookingStatus('Booked successfully!');
      fetchAvailableSlots(); 
    } catch (error) {
      setBookingStatus('Error booking the slot.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Book an Appointment</h1>

      <div>
        <label className="block text-lg">Select a Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="mt-6">
        {availableSlots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {availableSlots.map((slot) => (
              <SlotCard
                key={slot}
                slot={slot}
                onBookSlot={handleSlotSelection}
              />
            ))}
          </div>
        )}
      </div>

      {bookingStatus && <p className="mt-4 text-green-500">{bookingStatus}</p>}
    </div>
  );
};

export default BookingPage;
