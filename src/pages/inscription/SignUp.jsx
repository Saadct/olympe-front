import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    firstName: '',
    name: ''
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?!;*@#$%^&-+=()])(?=\S+$).{8,20}$/;

  const inputChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    if ((name === 'name' || name === 'firstName' || name === 'email' || name === 'password') && value.includes(' ')) {
      setMessage('Les espaces ne sont pas autorisés.');
     return;
    }
    if ((name === 'name' || name === 'firstName' || name === 'email' || name === 'fullName') && /[!#$%^&*()_+\=\[\]{};':"\\|,<>\/?]/.test(value)) {
      setMessage('Des caractères spéciaux ne sont pas autorisés dans ce champ.');
    return
    }
    if (name === 'password' && !passwordRegex.test(value)) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères et peut aller jusqu/à 20 caractères. Il doit inclure au moins un chiffre, une lettre minuscule, une lettre majuscule, et l/un des caractères spéciaux suivants : /?!;*@#$%^&-+=()/. De plus, aucun espace blanc n/est autorisé dans le mot de passe.');

    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData);
      toast.success('Inscription réussi avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
      
      setMessage('Inscription réussie ! Vous allez être redirigé');

      setTimeout(() => {
        setMessage('');
        navigate("/");
      }, 3000); 
    } catch (error) {
      toast.error('Erreur lors de la création du compte.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="d-flex mt-2 mb-5">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Inscription</h2>
              <form onSubmit={userSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Nom complet :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Prenom :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">Nom :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    required
                  />
                  <label className="form-check-label" htmlFor="agree">
                    J'accepte les <a href="/conditions-utilisation">conditions d'utilisations</a>
                  </label>
                </div>
                <div className="d-flex justify-content-center">  
                  <button type="submit" className="action-button mt-2">S'inscrire</button>
                </div>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
