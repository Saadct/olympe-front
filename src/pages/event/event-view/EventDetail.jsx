import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetailPage = () => {
  const { eventId } = useParams(); 
  const [event, setEvent] = useState(null); 
  const [isRegistered, setIsRegistered] = useState(false); 
  const [isAvailable, setIsAvailable] = useState(false); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {

        const response = await axios.get(`http://localhost:8080/evenements/details/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de l\'événement:', error);
      }
    };

    const checkRegistration = async () => {
      const token = localStorage.getItem('token');
      if(token){
      try {
        const response = await axios.get(`http://localhost:8080/users/ticket/checkregistration/${eventId}`, 
         {
          headers: {
            'Authorization': `Bearer ${token}`
          }
         } 
         );
        if (response.status === 200) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'inscription', error);
      }
    }
    };

    const checkAvailableEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/evenements/checkavailable/${eventId}`);
        if (response.status === 200) {
          setIsAvailable(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'inscription', error);
      }
    
    };

    checkRegistration();
    fetchEventDetails();
    checkAvailableEvent();
  }, [eventId]); 


    const subscription = async () => {
      const token = localStorage.getItem('token');

      if(token){
      try {
          const response = await axios.get(`http://localhost:8080/users/ticket/subscription/${eventId}`, 
            {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            } 
            );
          if (response.status === 200) {
            setIsRegistered(true);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'inscription', error);
        }
      }else{
        alert("Vous devez vous connecter");
        navigate('/connection')
      }

    };

  if (!event) {
    return <div>Chargement des détails de l'événement...</div>;
  }

  return (<div>
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p>Date: {event.dateEvent}</p>
      <p>Heure de début: {event.hourBegin}</p>
      <p>Heure de fin: {event.hourEnding}</p>
      <p>Places totales: {event.totalSeats}</p>
      <p>Places disponibles: {event.availableSeats}</p>
      <p>Prix standard: {event.standartPrice} €</p>
    

      <div className="registration-status">
        {isRegistered ? (
          <p>Vous êtes inscrit.</p>
        ) : (
          !isAvailable ? (
            <p>Plus de place disponible.</p>
          ) : (
            <button onClick={subscription}>Inscrivez-vous</button>
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default EventDetailPage;
