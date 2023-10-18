import React from 'react'
import "./App.css"
import Home from './pages/Home'

const BASE_URL = "http://localhost:8000/api"; // Sunucu adresi ve API yolu

const App = () => {
  return (
    <div className="container">
      <Home baseUrl={BASE_URL} />
    </div>
  )
}

export default App
