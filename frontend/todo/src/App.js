import React from 'react';
import "./App.css";
import Home from './pages/Home';
import { ToastContainer } from "react-toastify";

const BASE_URL = "http://localhost:8000/api"; // Server address and API path

const App = () => {
  return (
    <div className="container">
      <Home BASE_URL={BASE_URL} />
      <ToastContainer />
    </div>
  )
}

export default App
