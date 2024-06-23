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

  const handleChange = (e) => {
    setMessage('');

    const { name, value } = e.target;
    if ((name === 'name' || name === 'firstName' || name === 'email' || name === 'password') && value.includes(' ')) {
      setMessage('Les espaces ne sont pas autorisés.');
    }
    if (name === 'password' && value.length < 8) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères et peut aller jusqu/à 20 caractères. Il doit inclure au moins un chiffre, une lettre minuscule, une lettre majuscule, et l/un des caractères spéciaux suivants : /?!;*@#$%^&-+=()/. De plus, aucun espace blanc n/est autorisé dans le mot de passe.');
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {
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
      toast.error('Erreur lors de l/inscription de la catégorie.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer n/oubliez pas que votre mot de passe doit avoir + de 8 caracteres 1 majuscule et un caractere special.');
    }
  };

  return (
    <div className="d-flex mt-2 mb-5">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Nom complet :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  <button type="submit" className="action-button mt-2">Se connecter</button>
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
