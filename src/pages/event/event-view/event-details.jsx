import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';
import './event-details.css';


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
      if (token) {
        try {
          const response = await axios.get(`http://localhost:8080/users/ticket/checkregistration/${eventId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
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

    if (token) {
      try {
        const response = await axios.post(`http://localhost:8080/users/ticket/subscription/${eventId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'inscription', error);
      }
    } else {
      alert("Vous devez vous connecter");
      navigate('/connection');
    }
  };

  if (!event) {
    return <div className="d-flex justify-content-center"><Spinner animation="border" /></div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
      <Card>
        <Card.Header as="h3">{event.name}</Card.Header>
        <Card.Body>
          <Card.Text>Date: {event.dateEvent}</Card.Text>
          <Card.Text>Heure de début: {event.hourBegin}</Card.Text>
          <Card.Text>Heure de fin: {event.hourEnding}</Card.Text>
          <Card.Text>Places disponibles: {event.availableSeats}</Card.Text>
          <Card.Text style={{ overflowWrap: "break-word" }}>Intro: {event.shortDescription}</Card.Text>
          <Card.Text style={{ overflowWrap: "break-word" }}>Description: {event.longDescription}</Card.Text>

          <div className="registration-status">
            {isRegistered ? (
              <p className="text-success">Vous êtes inscrit.</p>
            ) : (
              !isAvailable ? (
                <p className="text-danger">Plus de place disponible.</p>
              ) : (
                <Button className="sub-button" onClick={subscription}>Inscrivez-vous</Button>
              )
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventDetailPage;
