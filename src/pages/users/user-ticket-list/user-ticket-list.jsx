import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "./UserList.css"
import { Link, useNavigate, useParams } from 'react-router-dom'; 

const UserTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate(); 
  const { id } = useParams(); 


  const fetchUsers = async (page, size) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/users/tickets/${id}/${page}/${size}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTickets(response.data[0]);
      setTotalPages(response.data[1]);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };


    useEffect(() => {
      fetchUsers(page, size);
    }, [page, size]);

  const nextPage = async () => {
    if (currentPage < totalPages - 1) { 
      await fetchUsers(currentPage + 1, size);
      setCurrentPage(currentPage + 1);
    }
  };
  
  const previousPage = async () => {
    if (currentPage > 0) {
      await fetchUsers(currentPage - 1, size);  
      setCurrentPage(currentPage - 1);
    }
  };

  const detailButtonClick = (eventId) => {
    navigate(`/admin/user-edit/${eventId}`);
  };

  const returnPreviousPage = () => {
    navigate(`/admin/user-edit/${id}`);
  };


  return (
    <div className="container">
    <h1 className="mb-0">Liste des tickets de l'utilisateur</h1>

    <button className="action-button detail mt-3" onClick={returnPreviousPage}>
    Retour 
    </button>
  
      <div className="table-responsive">
      {tickets.length == 0 ? (
        <div className="alert alert-info text-center">
          Aucun ticket trouvé.
        </div>
      ) : (
      <table className="table table-striped">
        <thead>
          <tr>
          <th>nom de l'évenement</th>
            <th>date de l'evenement</th>
            <th>heure de l'evenement</th>
            <th>voir l'evenement</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.uuid}>
              <td>{ticket?.evenement?.name}</td>
              <td>{ticket?.evenement?.dateEvent}</td>
              <td>{ticket?.evenement?.hourBegin}</td>

              <td>
              <button className="action-button detail" onClick={() => detailButtonClick(ticket.evenement.uuid)}>
              <i className="bi bi-search"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>
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
    
  );
}

export default UserTicketList;
