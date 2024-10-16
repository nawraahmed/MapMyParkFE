import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()

  const initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        formValues
      )
      const { token, user } = response.data
      localStorage.setItem('token', token) // Store JWT token
      setUser(user)
      navigate('/MainContent')
    } catch (err) {
      setError('Invalid email or password')
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
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
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
