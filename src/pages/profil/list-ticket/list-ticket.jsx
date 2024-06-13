import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list-ticket.css'; // Importer le fichier CSS
import CardTicket from './ticket';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(12); 
  const [url, setUrl] = useState(`http://localhost:8080/users/tickets/me/${page}/${size}`); 
  const [state, setState] = useState('');
  const [isFiltered, setFilter] = useState(false)


  useEffect(() => {
    fetchTickets(url);
  }, [page, size]);

  const fetchTickets = async (url) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const tickets = response.data[0]; 
      const totalPage = response.data[1]; 
      setTickets(tickets);
      setCurrentPage(page);
      setTotalPages(totalPage);
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets :", error);
    }
  };


  const nextPage = async () => {
    if (currentPage < totalPages - 1) { 
      if(isFiltered == false){
        await changeItemsPerPageTicketCard(currentPage + 1, itemsPerPage);
      }else{
        await handleTicketStateClick(state, currentPage + 1, itemsPerPage);
      }
      setCurrentPage(currentPage + 1);


    }
  };
  
  const previousPage = async () => {
    if (currentPage > 0) {
      if(isFiltered === false){
      await changeItemsPerPageTicketCard(currentPage - 1, itemsPerPage);
      }
      else{
        await handleTicketStateClick(state, currentPage - 1, itemsPerPage);
      }
      setCurrentPage(currentPage - 1);
    }
  };

  
  const changeItemsPerPageTicketCard = async (page, number) => {
    setState('');
    setFilter(false);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/users/tickets/me/${page}/${number}`,
         {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const eventData = response.data[0]; 
      const totalPage = response.data[1]; 
    
      setTotalPages(totalPage)
      setTickets(eventData);
      setItemsPerPage(number);
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets :", error);
    }
  };


  const handleTicketStateClick = async (state, page, size) => {

    setState(state);
    setFilter(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/users/tickets/me/${state}/${page}/${size}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const ticketsData = response.data[0]; 
      const totalPage = response.data[1]; 
      setTotalPages(totalPage);
      setTickets(ticketsData);
      setCurrentPage(0); 
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets :", error);
    }
  };
  
  return (
    <div>
      <Link to="/user/profil" className="btn btn-primary">retour</Link> 
      <h1>Mes tickets</h1>
      <div className="pagination-buttons centered-button">
        <button onClick={() => changeItemsPerPageTicketCard(0, size)} className="buttonPagination">
          tout
        </button>
        <button onClick={() => handleTicketStateClick('available', 0, size)  } className="buttonPagination">
          encore disponible
        </button>
      <button onClick={() => handleTicketStateClick('notavailable',0, size)} className="buttonPagination">
          plus disponible
        </button>
      </div>
      <div className="list-container">
        <div className="card-container">
          {tickets && tickets.map((ticket) => (  
            <CardTicket key={ticket.uuid} ticket={ticket} />
          ))}
          <div className="pagination-controls">
            <div className="pagination-buttons centered-button">
              <div>
                {currentPage + 1} / {totalPages} 
              </div>
            </div>
            <div className="pagination-buttons centered-button">
              <button onClick={previousPage} className="buttonPagination" disabled={currentPage === 0}>
                &lt;
              </button>
              <button onClick={nextPage} className="buttonPagination" disabled={currentPage === totalPages}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
