import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./event-create.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventCreate = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [totalSeat, setTotalSeat] = useState('');


  const navigate = useNavigate(); 

  const eventSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:8080/evenement`, 
      { type: type, name: name}
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.success('Catégorie ajoutée avec succès !', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
            navigate('/admin/event-list');
          }, 2000); 

      })
      .catch(error => {
        toast.error('Erreur lors de l\'ajout de la évènement.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Erreur lors de la mise à jour de la évènement:', error);
      });
  };


  const handlePasswordChange = () => {
    navigate('/user/profil/password');
  };

  const handleTickets = () => {
    navigate('/user/profil/tickets');
  };

  const returnPreviousPage = () => {
    navigate('/admin/event-list');
  };

  
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setType(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  return (
    <div className="Event-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header">
        <h1>Création d'une categorie</h1>

        </div>
        <h5>Nom</h5>
        <input type="text" name="name" value={name} onChange={handleEventChange} className="input-edit"/>

        <h5>Type</h5>

        <input type="text" name="type" value={type} onChange={handleEventChange} className="input-edit"/> 
          <form onSubmit={eventSubmit} className="edit-form">
            <button type="submit" className="save-button">Save</button>
          </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventCreate;
