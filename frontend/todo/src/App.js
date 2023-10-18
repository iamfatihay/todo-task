import React from 'react'
import "./App.css"
import Home from './pages/Home'

const BASE_URL = "http://localhost:8000/api"; // Server address and API path

const App = () => {
  return (
    <div className="container">
      <Home BASE_URL={BASE_URL} />
    </div>
  )
}

export default App
