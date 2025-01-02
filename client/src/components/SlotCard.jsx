import React from 'react';

const SlotCard = ({ slot, onBookSlot }) => (
  <div className="p-4 border rounded-md bg-green-200">
    <h3 className="text-lg">{slot}</h3>
    <button
      onClick={() => onBookSlot(slot)}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Book Slot
    </button>
  </div>
);

export default SlotCard;