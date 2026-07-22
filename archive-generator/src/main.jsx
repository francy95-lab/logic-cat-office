import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/archive-base.css';
import './styles/archive-pages.css';
import './styles/typography-preview.css';

createRoot(document.getElementById('root')).render(<App />);
