import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Authorized from './Authorized'
import UploadImage from '../components/UploadImage'

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/uploadimage" element={<UploadImage />} /> {/* Add this line */}
      <Route element={<Authorized />} />
    </Routes>
  );
};
