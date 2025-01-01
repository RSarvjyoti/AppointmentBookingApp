import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingPage = ({ userName }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:8080/api/slots?date=${new Date().toISOString().split('T')[0]}`);
        const data = response.data;
        if (Array.isArray(data.availableSlots)) {
          setAvailableSlots(data.availableSlots); 
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch available slots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, []);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (selectedSlot) {
      try {
        // Send booking request
        const response = await axios.post('http://localhost:8080/api/bookSlot', {
          date: new Date().toISOString().split('T')[0],
          slot: selectedSlot,
          userId: userName,
        });

        if (response.status === 200) {
          alert('Booking successful');
          setAvailableSlots(prevSlots => prevSlots.filter(slot => slot !== selectedSlot));
          setSelectedSlot('');  
        }
      } catch (err) {
        alert('Booking failed');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Book Your Slot</h1>
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4">
          {availableSlots.length === 0 ? (
            <div>No slots available</div>
          ) : (
            availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelection(slot)}
                className={`p-2 border rounded ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {slot}
              </button>
            ))
          )}
        </div>
      </div>
      {selectedSlot && (
        <button
          onClick={handleBooking}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
        >
          Book {selectedSlot}
        </button>
      )}
    </div>
  );
};

export default BookingPage;
