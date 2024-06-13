// src/components/EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>Date: {event.dateEvent}</p>
      <p>Heure de début: {event.hourBegin}</p>
      <p>Heure de fin: {event.hourEnding}</p>
      <p>Places totales: {event.totalSeats}</p>
      <p>Places disponibles: {event.availableSeats}</p>
      <p>Prix standard: {event.standartPrice} €</p>
      <a href={`/evenements/details/${event.uuid}`} className="view-details-button">Voir détails</a>
    </div>
  );
};

export default EventCard;
