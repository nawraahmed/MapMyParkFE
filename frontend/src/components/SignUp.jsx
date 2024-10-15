import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Send signup data to backend
      const response = await axios.post('http://localhost:4000/auth/register', {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      });

      setSuccess(response.data.message); // Display success message
      setError(''); // Clear error message
      setFormValues(initialState); // Reset form
      navigate('/signin'); // Redirect to SignIn page
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up.'); // Handle error response
    }
  };

  return (
    <div className="signup col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>

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

          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <button
            disabled={
              !formValues.name ||
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
          >
          <header>
          Register
          </header>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
