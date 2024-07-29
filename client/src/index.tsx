import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

/* 
  Prime React Configuration
 */
import "primeflex/primeflex.css"; //flex
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/md-light-indigo/theme.css"; //theme

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
