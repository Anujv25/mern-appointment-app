import { useState } from 'react'

import Signup from './components/auth/Signup'
import './App.css'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import {
  BrowserRouter as Router,Route,Routes
} from "react-router-dom";
function App() {

  return (
    <>
    <Router>
      <div>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/auth/forgot" element={<ForgotPassword />} />

        </Routes>

      </div>
      </Router>  
    </>
  )
}

export default App
