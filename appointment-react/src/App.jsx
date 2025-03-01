import { useState } from 'react'

import Signup from './components/auth/Signup'
import './App.css'
import Login from './components/auth/Login'
import Dashboard from './components/auth/Dashboard'
import ForgotPassword from './components/auth/ForgotPassword'
import {
  BrowserRouter as Router,Route,Routes
} from "react-router-dom";
import PrivateRoute from './components/auth/PrivateRoute'
import {AuthProvider} from './components/auth/Context'

function App() {

  return (
    <>
    <AuthProvider>
    <Router>
      <div>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Dashboard /> {/* Only accessible if user is authenticated */}
          </PrivateRoute>
        } 
      />
        <Route path="/auth/forgot" element={<ForgotPassword />} />

        </Routes>

      </div>
      </Router>  
      </AuthProvider>
    </>
  )
}

export default App
