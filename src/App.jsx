import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App