import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Signin } from '../../commonServices';

export default function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const temp = await Signin({ email, password });
    if (temp.status === 200) {
      navigate('/ImageUploader');
      localStorage.setItem('token', `Bearer ${temp.token}`);
      localStorage.setItem('user', JSON.stringify(temp.user));
    } else {
      setError(true);
    }
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form action="/home">
        <p>
          <label>Email Address</label>
          <br />
          <input
            type="text"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          {error && <p style={{ color: 'red' }}>Invalid Email or Password</p>}
          First time? <Link to="/register">Create an account</Link>.
        </p>
      </footer>
    </div>
  );
}
