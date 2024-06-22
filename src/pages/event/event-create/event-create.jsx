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



  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 
  const [categoryId, setCategoryId] = useState('');


  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/categories`,{
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
    axios.post(`http://localhost:8080/evenements/create`, 
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


  const returnPreviousPage = () => {
    navigate('/admin/event-list');
  };

  
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalSeats') {
      setTotalSeats(Number(value));
    } else if (name === 'name') {
      setName(value);
    }
    else if (name === 'dateEvent') {
        setDateEvent(value);
      }
      else if (name === 'hourBegin') {
        setHourBegin(value);
      }
      else if (name === 'hourEnding') {
        setHourEnding(value);
      }
      else if (name === 'shortDescription') {
        setShortDescription(value);
      }
      else if (name === 'longDescription') {
        setLongDescription(value);
      }else {
        
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);  
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
        <input type="text" name="name" onChange={handleEventChange} className="input-edit mb-1"/>

        <h5>Total de place</h5>
        <input type="number" name="totalSeats" onChange={handleEventChange} className="input-edit"/> 

        <div className="form-group">
          <label>Choisissez une catégorie :</label>
          <select
            id="categoryId"
            className="form-control"
            onChange={handleEventChange}
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
        <input type="date" className="form-control" onChange={handleEventChange} name="dateEvent"/>
        <small className="form-text text-muted">La date doit être celle du présent ou futur, pas passé.</small>
      </div>

      <div class="form-group mt-4">
        <label>Choisissez une heure du début de l'évènement :</label>
        <input type="time" className="form-control" onChange={handleEventChange} name="hourBegin"/>
      </div>

      <div class="form-group mt-4 mb-4">
        <label>Choisissez une heure de fin de l'évènement :</label>
        <input type="time" className="form-control" onChange={handleEventChange} name="hourEnding"/>
      </div>

      <h5>Courte déscription</h5>
      <textarea type="textarea" name="shortDescription" onChange={handleEventChange}
        style={{ width: "80%", minHeight: "100px", resize: "vertical" }}
      className="input-edit"/> 

    <h5>Longue déscription</h5>
      <textarea type="textarea" name="longDescription" onChange={handleEventChange}
        style={{ width: "100%", minHeight: "200px", resize: "vertical" }}
      className="input-edit"/> 


    <form onSubmit={eventSubmit} className="edit-form">
    <button type="submit" className="save-button">Save</button>
    </form>

          
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventCreate;
