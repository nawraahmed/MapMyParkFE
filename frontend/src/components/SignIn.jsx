import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();

  const initialState = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', formValues);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
      navigate('/MainContent'); // Navigate to main content page
    } catch (err) {
      setError('Invalid email or password'); // Display error message on failure
    }
  };

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
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
              value={formValues.password}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
