import React from 'react';
import { createRoot } from 'react-dom/client';
import Contact from './pages/Contact';
import './styles/site.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Contact />
  </React.StrictMode>
);
