import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import BookingPage from './components/BookingPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/booking/:userName" element={<BookingPage />} />
      </Routes>
  );
};

export default App;
