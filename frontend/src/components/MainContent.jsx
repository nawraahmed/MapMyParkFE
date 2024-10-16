import Header from './Header'
import Map from './Map'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MainContent() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if the user is logged in (you can adjust this logic based on your authentication)
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token) // If token exists, user is logged in
  }, [])

  const handleLogout = () => {
    // Clear auth tokens or session
    localStorage.removeItem('token') // Adjust this based on your auth logic
    setIsLoggedIn(false) // Set logged-in state to false
    navigate('/signin')
  }

  return (
    <div className="mainContentSize">
      {/* Main content */}
      <Map />
    </div>
  )
}

export default MainContent
