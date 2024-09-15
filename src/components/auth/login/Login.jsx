import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    const apiBaseUrl = 'http://127.0.0.1:8000';

    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        setErrorMessage('');

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        navigate('/')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Login failed. Please try again.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">Task Manager</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Dont have an account?</p>
        <Link className='btn btn-success m-2' to={`/signup/}`}>Signup</Link>
      </div>
    </div>
  );
};

export default UserLogin;
