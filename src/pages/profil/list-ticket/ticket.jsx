import React from 'react';
import './ticket.css'; 
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const CardTicket = ({ ticket }) => {
  const currentDate = new Date();
  const eventDate = new Date(ticket?.evenement.dateEvent);

  console.log('Date actuelle:', currentDate);
  console.log('Date de l\'événement:', eventDate);

  const cardClassName = eventDate > currentDate ? 'card card-green' : 'card card-red';

  console.log('Classe de la carte:', cardClassName);

  const handleUnsubscribe = async (uuid) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/users/ticket/me/cancel/${uuid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Navigate('/user/profil/tickets'); 
        } catch (error) {
      console.error('Erreur lors de la désinscription :', error);
    }
  };




  return (
    <div className={cardClassName}>
      <div className="card-body">
        <h5 className="card-title">{ticket.name} {ticket.firstname}</h5>
        <p className="card-text">{ticket.evenement.description}</p>
        <p>Category: {ticket.evenement.category?.name}</p>
        <p>date: {ticket?.evenement.dateEvent}</p>
        <p>Heure de début: {ticket.evenement.hourBegin}</p>
        <p>Heure de fin: {ticket.evenement.hourEnding}</p>
        <Link to={`/evenements/details/${ticket.evenement.uuid}`} className="view-button">Voir l'évenement</Link>
       {eventDate > currentDate && (
          <button onClick={() => handleUnsubscribe(ticket.uuid)} className="view-button">Se désinscrire</button>
     )}
         </div>
    </div>
  );
};

export default CardTicket;
