import React, { useState } from 'react';
import axios from 'axios';
import SlotCard from './components/SlotCard';

const App = () => {
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSlots = async (date) => {
    try {
      const response = await axios.get(`https://appointmentbookingapp.onrender.com/api/slots?date=${date}`);
      setSlots(response.data.availableSlots);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error fetching slots');
      setSlots([]);
    }
  };

  const handleBookSlot = async (slot) => {
    try {
      const response = await axios.post('https://appointmentbookingapp.onrender.com/api/bookSlot', {
        userName,
        appointmentDate: selectedDate,
        slot,
      });
      setMessage(response.data.message);
      fetchSlots(selectedDate);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="p-5">
      {step === 1 && (
        <div>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            className="p-2 border rounded-md"
          />
          <button
            onClick={() => setStep(2)}
            disabled={!userName}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchSlots(e.target.value);
            }}
            min={new Date().toISOString().split('T')[0]}
            className="p-2 border rounded-md"
          />
          {message && <p className="mt-2 text-red-500">{message}</p>}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {slots.length > 0 ? (
              slots.map((slot, index) => (
                <SlotCard
                  key={index}
                  slot={slot}
                  status="available"
                  onBookSlot={() => handleBookSlot(slot)}
                />
              ))
            ) : (
              <p>No slots available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;