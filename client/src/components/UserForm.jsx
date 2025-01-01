import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const UserForm = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => setUserName(e.target.value);

  const handleNext = () => {
    if (userName) {
      navigate(`/booking/${userName}`); 
    } else {
      alert('Please enter a valid name.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-4">Enter Your Name</h1>
      <input
        type="text"
        className="p-2 border rounded-md"
        value={userName}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button
        onClick={handleNext}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default UserForm;