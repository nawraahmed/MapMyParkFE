import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MainContent from './components/MainContent'
import TicketList from './components/TicketList' // Adjust the path if necessary

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <div className="App">
      <header>
        {user ? (
          <>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <p>Please sign in or sign up</p>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/MainContent" element={<MainContent />} />

          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          {user && (
            <Route path="/tickets" element={<TicketList />} /> // Route for TicketList
          )}
          {/* Redirect to the ticket list after signing in */}
        </Routes>
      </main>
    </div>
  )
}

export default App
