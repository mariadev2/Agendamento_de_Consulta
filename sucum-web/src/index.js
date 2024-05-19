import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import routerConfig from './config/routerConfig';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
