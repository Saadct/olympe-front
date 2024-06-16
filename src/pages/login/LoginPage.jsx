import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


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

      toast.success('connection avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (response.headers.has('Authorization')) {
        localStorage.setItem('role', response.data.role);
        setIsLoggedIn(true); 
        localStorage.setItem('token', response.headers.get('Authorization'))
        console.log('Authorization Header:', response.headers.get('Authorization'));
        console.log(localStorage.getItem('token'));
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Erreur lors de la connection.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      
        <button type="submit">Login</button>
      </form>
      <ToastContainer />

    </div>
  );
};

export default LoginPage;
