import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response);
      console.log('Login successful:', response.data);
   
      if (response.headers.has('Authorization')) {
        localStorage.setItem('role', response.data.role);
        setIsLoggedIn(true); 
        localStorage.setItem('token', response.headers.get('Authorization'))
        console.log('Authorization Header:', response.headers.get('Authorization'));
        console.log(localStorage.getItem('token'));
        window.location.href = '/';
      } else {
        console.log('Authorization Header not present in response');
      }
      
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="agree">
            <input
              type="checkbox"
              id="agree"
              required
            />
            I agree to the <a href="/conditions-utilisation" >terms and conditions</a>
            </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
