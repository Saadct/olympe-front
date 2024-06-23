import React from 'react';
import './event-card.css'; // Importer le fichier CSS pour les styles spécifiques à EventCard

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2 className="event-name">{event.name}</h2>
        <p className="event-category">{event.category.name}</p>
      </div>
      <div className="event-card-body">
        <p className="event-date">Date: {event.dateEvent}</p>
        <p className="event-time">Heure de début: {event.hourBegin}</p>
        <p className="event-time">Heure de fin: {event.hourEnding}</p>
        <p className="event-seats">Places disponibles: {event.availableSeats}</p>
      </div>
      <div className="event-card-footer">
        <a href={`/evenements/details/${event.uuid}`} className="view-details-button">Voir détails</a>
      </div>
    </div>
  );
};

export default EventCard;
