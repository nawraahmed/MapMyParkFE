
import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    navigate('/signin');
  };

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
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

