import React from 'react';
import { createRoot } from 'react-dom/client';
import Scenarios from './pages/Scenarios';
import './styles/site.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Scenarios />
  </React.StrictMode>
);
