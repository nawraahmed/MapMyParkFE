import Header from './Header'
import Map from './Map'
import { useNavigate, Link } from 'react-router-dom'

function MainContent() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth tokens or session (e.g., remove token from localStorage)
    localStorage.removeItem('token') // Adjust this based on your auth logic
    navigate('/signin')
  }

  return (
    <div className="mainContentSize">
      {/* Mount the header here */}
      <Header />
      <Link to="/tickets">
        <button>Go to Tickets</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      {/* Main content */}
      <Map />
    </div>
  )
}

export default MainContent
