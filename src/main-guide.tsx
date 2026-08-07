import React from 'react';
import { createRoot } from 'react-dom/client';
import Guide from './pages/Guide';
import './styles/site.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Guide />
  </React.StrictMode>
);
