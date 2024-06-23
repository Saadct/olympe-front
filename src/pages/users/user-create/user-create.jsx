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


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get('http://localhost:8080/users/check-connected-admin', {
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
    axios.post(`http://localhost:8080/auth/signup`, 
      { email: email, name: name, 
        firstName: firstName, fullName: fullName, 
        password: password
      }
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.success('User crée avec succès !', {
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
        toast.error('Erreur lors de la création de l%user.', {
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

  
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    }
    else if (name === 'fullName') {
        setFullName(value);
      }
      else if (name === 'firstName') {
        setFirstName(value);
      }
      else if (name === 'password') {
        setPassword(value);
      }
  };

  return (
    <div className="category-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header">
        <h1>Création d'un utilisateur</h1>
        </div>
        <input type="text" name="name" onChange={handleUserChange} className="input-edit input-spacing" placeholder='prenom'/>
        <input type="text" name="firstName" onChange={handleUserChange} className="input-edit input-spacing" placeholder='nom'/>
        <input type="text" name="fullName" onChange={handleUserChange} className="input-edit input-spacing" placeholder='surnom'/> 
        <input type="email" name="email" onChange={handleUserChange} className="input-edit input-spacing" placeholder='email'/> 
        <input type="password" name="password" onChange={handleUserChange} className="input-edit input-spacing" placeholder='mot de passe'/> 

          <form onSubmit={userSubmit} className="edit-form">
            <button type="submit" className="save-button">Save</button>
          </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCreate;
