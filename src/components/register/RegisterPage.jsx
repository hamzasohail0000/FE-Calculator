import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Signup } from '../../commonServices';
import '../../App.css';

export default function SignUpPage() {
  const [response, setResponse] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    const temp = await Signup({ email, password, name: username });
    setResponse(temp);
    if (temp.status === 201) {
      navigate('/login');
    } else {
      setError(true);
    }
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="first_name"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
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
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          {error && (
            <p style={{ color: 'red' }}>
              Invalid Data Entered or email already exist
            </p>
          )}
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
      {console.log({ response })}
    </div>
  );
}
