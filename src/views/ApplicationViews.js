import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Authorized from './Authorized';
import UploadImage from '../components/UploadImage';
import Home from '../components/Home';
import Profile from '../components/Profile';

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/uploadimage" element={<UploadImage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Login />} index={true} /> 
      <Route element={<Authorized />} />
    </Routes>
  );
};
