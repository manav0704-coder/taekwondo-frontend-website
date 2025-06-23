import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals
reportWebVitals(metric => {
  // Send metrics to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics provider (if configured)
    // console.log(metric);
  }
});
