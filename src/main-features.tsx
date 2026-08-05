import React from 'react';
import { createRoot } from 'react-dom/client';
import Features from './pages/Features';
import './styles/site.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Features />
  </React.StrictMode>
);
