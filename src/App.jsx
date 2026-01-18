import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useEffect} from 'react'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  return (
    <div>

      {currentPage === "register" && <Registration />}
      {currentPage === "login" && (isLoggedIn ? (
        <h1>Welcome, Admin!</h1>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ))}
    </div>
  )
}
export default App