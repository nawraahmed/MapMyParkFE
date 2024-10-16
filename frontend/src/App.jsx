import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MainContent from './components/MainContent'
import TicketList from './components/TicketList'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <div className="App">
      {/* Pass the user and handleLogOut to the Header */}
      <Header user={user} handleLogout={handleLogOut} />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/MainContent" element={<MainContent />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          {user && <Route path="/tickets" element={<TicketList />} />}
        </Routes>
      </main>
    </div>
  )
}

export default App
