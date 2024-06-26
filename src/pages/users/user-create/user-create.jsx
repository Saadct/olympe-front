import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './user-create.css'

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');

  const [name, setName] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?!;*@#$%^&-+=()])(?=\S+$)$/;


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get(`${process.env.REACT_APP_API_URL}/users/check-connected-admin`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        navigate("/deconnexion");
      } 
    };
    checkConnection();
  }, [navigate]);
  

  const userSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, 
      { email: email, name: name, 
        firstName: firstName, fullName: fullName, 
        password: password
      }
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.success('utilisateur crée avec succès !', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
/*
        setTimeout(() => {
            navigate('/admin/category-list');
          }, 2000); 
*/
      })
      .catch(error => {
        toast.error('Erreur lors de la création de l\'utilisateur.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };


  const returnPreviousPage = () => {
    navigate('/admin/user-list');
  };

  
  const userChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    const specialCharRegex = /[^a-zA-Z0-9 ]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour vérifier l'email
  
    if (name === 'name' || name === 'fullName' || name === 'firstName') {
      if (specialCharRegex.test(value)) {
        setMessage(`Le champ ${name} ne doit contenir que des lettres, des chiffres et des espaces.`);
        return;
      }
      if (value.length > 20) {
        setMessage(`Le champ ${name} ne doit pas dépasser 20 caractères.`);
        return;
      }
    }
  
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setMessage('Veuillez entrer une adresse email valide.');
        return;
      }
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'fullName') {
      setFullName(value);
    } else if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'password') {
      setPassword(value);
      if (!passwordRegex.test(value)) {
        setMessage('Le mot de passe doit contenir au moins 8 caractères et peut aller jusqu’à 20 caractères. Il doit inclure au moins un chiffre, une lettre minuscule, une lettre majuscule, et l’un des caractères spéciaux suivants : ?!;*@#$%^&-+=(). Aucun espace blanc n’est autorisé.');
      }
    }
  };
  

  return (
    <div className="category-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header">
        <h1>Création d'un utilisateur</h1>
        </div>
        <input type="text" name="name" onChange={userChange} className="input-edit input-spacing" placeholder='prenom'/>
        <input type="text" name="firstName" onChange={userChange} className="input-edit input-spacing" placeholder='nom'/>
        <input type="text" name="fullName" onChange={userChange} className="input-edit input-spacing" placeholder='surnom'/> 
        <input type="email" name="email" onChange={userChange} className="input-edit input-spacing" placeholder='email'/> 
        <input type="password" name="password" onChange={userChange} className="input-edit input-spacing" placeholder='mot de passe'/> 

          <form onSubmit={userSubmit} className="edit-form">
            <button type="submit" className="save-button">Créer</button>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCreate;
