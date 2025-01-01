import React from 'react';

const SlotCard = ({ slot, onBookSlot }) => {
  const isAvailable = slot.status === 'available';

  return (
    <div
      className={`p-4 border rounded-md ${isAvailable ? 'bg-green-200' : 'bg-red-200'}`}
    >
      <h3 className="text-lg">{slot}</h3>
      {isAvailable ? (
        <button
          onClick={() => onBookSlot(slot)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Book Slot
        </button>
      ) : (
        <p className="text-gray-500">Booked</p>
      )}
    </div>
  );
};

export default SlotCard;