import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewProfil.css'

const ViewProfil = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editableFullname, setEditableFullname] = useState('');
  const [editableEmail, setEditableEmail] = useState('');

  const [firstName, setFirstname] = useState('');
  const [editableFirstName, setEditableFirstName] = useState('');
  const [name, setName] = useState('');
  const [editableName, setEditableName] = useState('');
  const navigate = useNavigate(); 
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?!;*@#$%^&-+=()])(?=\S+$).{8,20}$/;
  const [message, setMessage] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get(`${process.env.REACT_APP_API_URL}/users/check-connected`, {
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



  useEffect(() => {
    
    const token = localStorage.getItem('token');

    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setFullname(response.data.fullName);
      setEditableFullname(response.data.fullName);
      setEmail(response.data.email);
      setEditableEmail(response.data.email);
      setFirstname(response.data.firstName);
      setEditableFirstName(response.data.firstName)
      setName(response.data.name);
      setEditableName(response.data.name);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de profil:', error);
    });
  }, []);

  /*
  const changeProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullname') {
      setEditableFullname(value);
    } else if (name === 'email') {
      setEditableEmail(value);
    }
    else if (name === 'name') {
        setEditableName(value);
      }
      else if (name === 'firstName') {
        setEditableFirstName(value);
      }
  };
  */


  const inputChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    if ((name === 'name' || name === 'firstName' || name === 'email' || name === 'password') && value.includes(' ')) {
      setMessage('Les espaces ne sont pas autorisés.');
     return;
    }
    if ((name === 'name' || name === 'firstName' || name === 'email' || name === 'fullName') && /[!#$%^&*()_+=\[\]{};':"\\|,<>\/?]/.test(value)) {
      setMessage('Des caractères spéciaux ne sont pas autorisés dans ce champ.');
    return
    }
    if (name==='password' && !passwordRegex.test(value)) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères et peut aller jusqu/à 20 caractères. Il doit inclure au moins un chiffre, une lettre minuscule, une lettre majuscule, et l/un des caractères spéciaux suivants : /?!;*@#$%^&-+=()/. De plus, aucun espace blanc n/est autorisé dans le mot de passe.');
    }
    
    if (name === 'fullName') {
      setEditableFullname(value);
    } else if (name === 'email') {
      setEditableEmail(value);
    }
    else if (name === 'name') {
        setEditableName(value);
      }
      else if (name === 'firstName') {
        setEditableFirstName(value);
      }
  };


  const editProfile = () => {
    setIsEditingProfile(true);
  };

  const profileSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`${process.env.REACT_APP_API_URL}/users/me`, 
      { fullName: editableFullname, email: editableEmail, firstName: firstName, name: name}
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setIsEditingProfile(false);
        setFullname(editableFullname);
        setEmail(editableEmail);
        if (email !== editableEmail) {
          alert('Votre email a été mis à jour. Veuillez vous reconnecter.');
          localStorage.removeItem('token'); 
          navigate('/connection');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      });
  };



  const passwordChange = () => {
    navigate('/user/profil/password');
  };

  const viewTickets = () => {
    navigate('/user/profil/tickets');
  };

  return (
    <div>
      <h1 className='headerProfil'>Mon profil</h1>
      <div className="profile-container">
        <div className="profile-header">
          <h1 onClick={editProfile}>{isEditingProfile ? <input type="text" name="fullName" value={editableFullname} onChange={inputChange} className="input-edit"/> : fullname}</h1>
          {!isEditingProfile && (
            <button className="edit-button" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
          )}
        </div>
        <h1 onClick={editProfile}>{isEditingProfile ? <input type="text" name="email" value={editableEmail} onChange={inputChange} className="input-edit"/> : email}</h1>
    
    
        <h2>Nom </h2>
        <h3 onClick={editProfile}>{isEditingProfile ? <input type="text" name="firstName" value={editableFirstName} onChange={inputChange} className="input-edit"/> : firstName}</h3>
        <h2>Prenom </h2>
        <h3 onClick={editProfile}>{isEditingProfile ? <input type="text" name="name" value={editableName} onChange={inputChange} className="input-edit"/> : name}</h3>

    
        {isEditingProfile && (
          <form onSubmit={profileSubmit} className="edit-form">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditingProfile(false)}>Cancel</button>
          </form>
          
        )}

        <button className="change-password-button" onClick={passwordChange}>Change Password</button>
        <button className="change-password-button" onClick={viewTickets}>Voir ses tickets</button>

      </div>
      {message && <p className="mt-3 text-center">{message}</p>}

    </div>
  );
};

export default ViewProfil;
