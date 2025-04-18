import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css";
import "https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js";
import "https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
