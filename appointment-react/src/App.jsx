import { useState } from 'react'

import Signup from './components/auth/Signup'
import './App.css'
import Login from './components/auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Login/>

      </div>
    </>
  )
}

export default App
