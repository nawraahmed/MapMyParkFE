import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function MainContent() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth tokens or session
    navigate('/signin')
  }

  return (
    <div>
      <h2>Welcome to the Theme Park App</h2>
      <Link to="/tickets">
        <button>Go to Tickets</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default MainContent
