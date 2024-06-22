import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';


const EventListByIdCategory = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const{ id } = useParams("id");

  const navigate = useNavigate(); 

  const fetchEvents = async (page, size) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/evenements/paginatedByCategory/${page}/${size}/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        
      });
      setEvents(response.data[0]);
      setTotalPages(response.data[1]);

    } catch (error) {
      console.error('Erreur lors de la récupération des categories:', error);
    }
  };


  const deleteEvent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/evenements/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Evenement supprimée avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await fetchEvents(page, size);
    } catch (error) {
      toast.error('Erreur lors de la suppression de l%évènement.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Erreur lors de la suppression de l%évènement:', error);
    }
  };

    useEffect(() => {
        fetchEvents(page, size);
    }, [page, size]);

  const nextPage = async () => {
    if (currentPage < totalPages - 1) { 
      await fetchEvents(currentPage + 1, size);
      setCurrentPage(currentPage + 1);
    }
  };
  
  const previousPage = async () => {
    if (currentPage > 0) {
      await fetchEvents(currentPage - 1, size);  
      setCurrentPage(currentPage - 1);
    }
  };

  const detailButtonClick = (userId) => {
    navigate(`/admin/event-edit/${userId}`);
  };

  const createEventButton = () => {
    navigate(`/admin/event-create/`);
  };

  const returnPreviousPage = () => {
    navigate('/admin/category-list');
  };

  return (
    <div className="container">
    <h1 className="mb-0">Liste des Evenements pour la categorie</h1>
   <div className="d-flex justify-content-between align-items-center">
       <button className="action-button detail" onClick={returnPreviousPage}>
      retour
      </button>
    <button className="action-button detail" onClick={createEventButton}>
    Créer 
    </button>
  </div>
      <div className="table-responsive">
      {events.length == 0 ? (
        <div className="alert alert-info text-center">
          Aucun evenement trouvé.
        </div>
      ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>date</th>
            <th>heure début</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.uuid}>
              <td>{event?.name}</td>
              <td>{event?.dateEvent}</td>
              <td>{event?.hourBegin}</td>
              <td>
              <button className="action-button detail" onClick={() => detailButtonClick(event.uuid)}>
              <i className="bi bi-search"></i>
              </button>
              <button className="action-button remove" onClick={() => deleteEvent(event.uuid)}>
                
              <i className="bi bi-trash"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>           
       {events.length > 0 && (
      <div className="pagination-controls">
            <div className="pagination-buttons centered-button">
        <div className="pagination-info">
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
           )}


<ToastContainer />

    </div>
    
  );
}

export default EventListByIdCategory;
