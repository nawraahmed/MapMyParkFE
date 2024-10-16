import { Link } from 'react-router-dom'

const Header = ({ user, handleLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Map My Park</h1>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <Link to="/tickets" className="nav-link">
            Tickets
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        {/* Conditionally render either Sign In or Logout */}
        {user ? (
          <button onClick={handleLogout} className="sign-in-btn">
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button className="sign-in-btn">Sign In</button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
