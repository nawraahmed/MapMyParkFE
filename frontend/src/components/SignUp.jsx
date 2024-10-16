import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/auth/register', {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });

      setSuccess('Account created successfully!');
      setError('');
      navigate('/signin'); // Redirect to SignIn
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error signing up.');
    }
  };

  return (
    <div className="signup col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <button disabled={!formValues.name || !formValues.email || !formValues.password}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
