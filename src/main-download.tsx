import React from 'react';
import { createRoot } from 'react-dom/client';
import Download from './pages/Download';
import './styles/site.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Download />
  </React.StrictMode>
);
