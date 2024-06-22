import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventEdit = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');

  const [totalSeats, setTotalSeats] = useState(0);
  const [dateEvent, setDateEvent] = useState('');
  const [hourBegin, setHourBegin] = useState('');
  const [hourEnding, setHourEnding] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const { id } = useParams();
  const [longDescription, setLongDescription] = useState('');
  const [event, setEvent] = useState({});

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 
  const [categoryId, setCategoryId] = useState('');
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [categoryName, setCategoryName] = useState('');


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

  const fetchEvent = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/evenements/details/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      setEvent(response.data);
      setName(response.data.name);
      setTotalSeats(response.data.totalSeats);
      setAvailableSeats(response.data.availableSeats);
      setCategoryId(response.data.category.uuid);
      setCategoryName(response.data.category.name);
      setDateEvent(response.data.dateEvent);
      setHourBegin(response.data.hourBegin);
      setHourEnding(response.data.hourEnding);
      setShortDescription(response.data.shortDescription);
      setLongDescription(response.data.longDescription);

    } catch (error) {
      console.error('Erreur lors de la récupération de l%évènement:', error);
    }
  };





  const eventSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:8080/evenements/update/${id}`, 
      { name: name,
        categoryId: categoryId, dateEvent: dateEvent, totalSeats: totalSeats,
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
/*
        setTimeout(() => {
            navigate('/admin/event-list');
          }, 2000); 
*/
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

  const viewSubscription = () => {
    navigate(`/admin/event-edit/subscription-list/${id}`);
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

  const handleEditEvent = () => {
    setIsEditingEvent(true);
  };

  useEffect(() => {
    fetchEvent();
    fetchCategories(); 
  }, []); 

  return (
    <div className="Event-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header mb-3">
        <h1>Edition/Détail d'un évènement</h1>
        {!isEditingEvent && (
            <button className="edit-button" onClick={() => setIsEditingEvent(true)}>Edit Event</button>
          )}
        </div>
        <h5 onClick={handleEditEvent}>Nom: {isEditingEvent ? <input type="text" name="name" value={name} onChange={handleEventChange} className="input-edit"/> : name }</h5>
        <h5 onClick={handleEditEvent}>Total de place: {isEditingEvent ? <input type="text" name="totalSeats" value={totalSeats} onChange={handleEventChange} className="input-edit"/> : totalSeats }</h5>
        <h5>Place disponible: {availableSeats}</h5>

        <h5 onClick={handleEditEvent}> Categorie :{isEditingEvent ? 
        <div className="form-group">
          <select
            id="categoryId"
            className="form-control mt-1"
            onChange={handleEventChange}
            value={categoryId}
          >
            <option value="" >Sélectionnez une catégorie</option>
            {categories.map(category => (
              <option key={category.uuid} value={category.uuid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
            : categoryName }</h5>

        <h5 onClick={handleEditEvent}>Date début évènement: {isEditingEvent ? 
        <div class="form-group mt-1">
        <input type="date" className="form-control" value={dateEvent} onChange={handleEventChange} name="dateEvent"/>
        <small className="form-text text-muted">La date doit être celle du présent ou futur, pas passé.</small>
      </div>
         : dateEvent }</h5>

        <h5 onClick={handleEditEvent}>Heure début évènement: {isEditingEvent ? 
        <div class="form-group mt-4">
            <input type="time" className="form-control" onChange={handleEventChange} value={hourBegin} name="hourBegin"/>
        </div>
            : hourBegin }</h5>

    <h5 onClick={handleEditEvent}>Heure Fin évènement: {isEditingEvent ? 
      <div class="form-group mt-4 mb-4">
        <input type="time" className="form-control" onChange={handleEventChange} value={hourEnding} name="hourEnding"/>
      </div>
        : hourEnding }</h5>

    <h5>Courte déscription</h5>
    <p style={{ overflowWrap: "break-word" }} onClick={handleEditEvent} >{isEditingEvent ?
      <textarea type="textarea" name="shortDescription" onChange={handleEventChange} value={shortDescription}
      style={{ width: "100%", minHeight: "100px", resize: "vertical" }}
      className="input-edit"/> 
      : shortDescription }</p>



    <h5>Longue déscription</h5>
    <p onClick={handleEditEvent} style={{ overflowWrap: "break-word" }}>{isEditingEvent ? 
      <textarea type="textarea" name="longDescription" onChange={handleEventChange} value={longDescription}
        style={{ width: "100%", minHeight: "200px", resize: "vertical" }}
      className="input-edit"/> 
            : longDescription }</p>


    {isEditingEvent && (
    <form onSubmit={eventSubmit} className="edit-form">
    <button type="submit" className="save-button">Save</button>
    <button type="button" className="cancel-button" onClick={() => setIsEditingEvent(false)}>Cancel</button>
    </form>
    )};

{!isEditingEvent && (
        <button className="action-button" onClick={viewSubscription}>Voir les inscriptions lié</button>
     
   )}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default EventEdit;
