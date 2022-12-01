import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomeSchool from './components/HomeSchool/HomeShool';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import HomeStudent from './components/HomeStudent/HomeStudent';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/school' element={<HomeSchool />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student' element={<HomeStudent />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);


reportWebVitals();
