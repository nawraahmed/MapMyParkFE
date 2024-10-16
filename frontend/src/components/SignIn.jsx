import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/auth/login', formValues);
      const { token, user } = res.data;

      // Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user); // Set user state
      navigate('/MainContent'); 
    } catch (err) {
      console.error('Sign-in failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              className="signInInput"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
          <button
            className="btn"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
