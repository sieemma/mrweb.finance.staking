import React from "react";
import "./App.css";
import Router from "./Router";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="mrwebfinance">
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
