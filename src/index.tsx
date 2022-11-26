import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home/Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/school'
        element={<Home />}
      //element={<Navigate to="/login" />} 
      />
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter >
);


reportWebVitals();
