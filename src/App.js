import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from './components/calculator/Calculator';
import LoginPage from './components/login/LoginPage';
import Register from './components/register/RegisterPage';
import ImageUploader from './components/imagesViewer/ImageUploader';
import './App.css';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="calculator" element={<Calculator />} />
      <Route path="Signup" element={<Register />} />
      <Route path="ImageUploader" element={<ImageUploader />} />
    </Routes>
  );
}
