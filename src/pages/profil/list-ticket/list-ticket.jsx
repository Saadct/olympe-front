import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './list-ticket.css'; 
import CardTicket from './ticket';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(12); 
  const [state, setState] = useState('');
  const [isFiltered, setFilter] = useState(false)
  const navigate = useNavigate(); 


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get(`${process.env.REACT_APP_API_URL}/users/check-connected`, {
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
  

  const fetchTickets = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/tickets/me/${page}/${size}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const ticketsData = response.data[0];
      const totalPage = response.data[1];
      setTickets(ticketsData);
      setCurrentPage(page);
      setTotalPages(totalPage);
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets :", error);
    }
  }, [page, size]); 


  useEffect(() => {
    setPage(page);
    setSize(size);
    fetchTickets();
  }, [page, size, fetchTickets]);

  const nextPage = async () => {
    if (currentPage < totalPages - 1) { 
      if(isFiltered === false){
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/tickets/me/${page}/${number}`,
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/tickets/me/${state}/${page}/${size}`,
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
    <div className="centered-container">
      <h1>Mes tickets</h1>
      <Link to="/user/profil" className="action-button">retour</Link> 

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
{tickets.length === 0 ?
      <div className="alert alert-info text-center" style={{ width: "60%", margin: "20px auto" }}>
        Aucun ticket trouvé.
      </div>
      : null
}     
      <div className="list-container">
        <div className="card-container">
          {tickets && tickets.map((ticket) => (  
            <CardTicket key={ticket.uuid} ticket={ticket} handleTickets={fetchTickets} />
            
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
