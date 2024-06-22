import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      toast.success('Connexion réussie !', {
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
        localStorage.setItem('token', response.headers.get('Authorization'));
        console.log('Authorization Header:', response.headers.get('Authorization'));
        console.log(localStorage.getItem('token'));
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Erreur lors de la connexion.', {
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
    <div className="d-flex" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Connexion</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">  
                  <button type="submit" className="action-button mt-4">Se connecter</button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
