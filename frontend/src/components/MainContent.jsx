import Header from './Header'
import Map from './Map'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function MainContent() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear auth tokens or session
    navigate('/signin')
  }

const MainContent = () => {
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
