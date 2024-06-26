import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./event-create.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventCreate = () => {
  const [name, setName] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [dateEvent, setDateEvent] = useState('');
  const [hourBegin, setHourBegin] = useState('');
  const [hourEnding, setHourEnding] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const [longDescription, setLongDescription] = useState('');

  const [message, setMessage] = useState('');


  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 
  const [categoryId, setCategoryId] = useState('');

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





  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des categories:', error);
    }
  };


  const eventSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_API_URL}/evenements/create`, 
      { name: name, totalSeats: totalSeats,
        categoryId: categoryId, dateEvent: dateEvent,
        hourBegin: hourBegin, hourEnding: hourEnding,
        shortDescription: shortDescription, longDescription: longDescription
      }
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.success('événement ajoutée avec succès !', {
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
        toast.error('Erreur lors du processus de création de cette évènement.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Erreur lors de la création de cette évènement:', error);
      });
  };


  const returnPreviousPage = () => {
    navigate('/admin/event-list');
  };

  
  const eventChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
  
    const regex = /^[a-zA-Z0-9À-ÿ\s.,:;!?"'()-]*$/;
  
    if (!regex.test(value)) {
      setMessage(`Le champ ${name} ne doit contenir que des lettres, des chiffres et les caractères spéciaux suivants : À-ÿ\s.,:;!?"'()-`);
      
    }else{
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'shortDescription':
          setShortDescription(value);
          break;
        case 'longDescription':
          setLongDescription(value);
          break;
        default:
          break;
      }

    }
  
    switch (name) {
      case 'totalSeats':
        setTotalSeats(Number(value));
        break;
      case 'dateEvent':
        setDateEvent(value);
        break;
      case 'hourBegin':
        setHourBegin(value);
        break;
      case 'hourEnding':
        setHourEnding(value);
        break;
      case 'name':
        break;
      case 'shortDescription':
        break;
      case 'longDescription':
        break;
      default:
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);  
        break;
    }
  };
  

  useEffect(() => {
    fetchCategories(); 
  }, []); 

  return (
    <div className="Event-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header mb-3">
        <h1>Création d'un évènement</h1>

        </div>
        <h5>Nom</h5>
        <input type="text" name="name" value={name} onChange={eventChange} className="input-edit mb-1"/>

        <h5>Total de place</h5>
        <input type="number" name="totalSeats"  onChange={eventChange} className="input-edit"/> 

        <div className="form-group">
          <label>Choisissez une catégorie :</label>
          <select
            id="categoryId"
            className="form-control"
            onChange={eventChange}
          >
            <option value="" >Sélectionnez une catégorie</option>
            {categories.map(category => (
              <option value={category.uuid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div class="form-group mt-4">
        <label>Choisissez une date :</label>
        <input type="date" className="form-control" onChange={eventChange} name="dateEvent"/>
        <small className="form-text text-muted">La date doit être celle du présent ou futur, pas passé.</small>
      </div>

      <div class="form-group mt-4">
        <label>Choisissez une heure du début de l'évènement :</label>
        <input type="time" className="form-control" onChange={eventChange} name="hourBegin"/>
      </div>

      <div class="form-group mt-4 mb-4">
        <label>Choisissez une heure de fin de l'évènement :</label>
        <input type="time" className="form-control" onChange={eventChange} name="hourEnding"/>
      </div>

      <h5>Courte déscription</h5>
      <textarea type="textarea" name="shortDescription" value={shortDescription} onChange={eventChange}
        style={{ width: "80%", minHeight: "100px", resize: "vertical" }}
      className="input-edit"/> 

    <h5>Longue déscription</h5>
      <textarea type="textarea" name="longDescription" value={longDescription} onChange={eventChange}
        style={{ width: "100%", minHeight: "200px", resize: "vertical" }}
      className="input-edit"/> 


    <form onSubmit={eventSubmit} className="edit-form">
    <button type="submit" className="save-button">Créer</button>
    </form>
    {message && <p className="mt-3 text-center">{message}</p>} 
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventCreate;
