// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-router-dom' // Import Link

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-ticket">Create Ticket</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
