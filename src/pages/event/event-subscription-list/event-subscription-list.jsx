import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';


const EventSubscriptionList = () => {
  const [eventSubscriptions, setEventSubscriptions] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const{ id } = useParams("id");

  const navigate = useNavigate(); 

  const fetchEventSubscriptions = async (page, size) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/tickets/paginated/${id}/${page}/${size}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        
      });
      setEventSubscriptions(response.data[0]);
      setTotalPages(response.data[1]);

    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions:', error);
    }
  };

  
  const handleUnsubscribe = async (uuid) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/users/ticket/cancel-subscription/${uuid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Désinscription réussie !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchEventSubscriptions(page, size);

  
    } catch (error) {
      console.error('Erreur lors de la désinscription :', error);
  
      toast.error('Erreur lors de la désinscription.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



    useEffect(() => {
      fetchEventSubscriptions(page, size);
    }, [page, size]);

  const nextPage = async () => {
    if (page < totalPages - 1) { 
      setCurrentPage(page + 1);
    }
  };
  
  const previousPage = async () => {
    if (page > 0) {
      setCurrentPage(page - 1);
    }
  };

  const detailButtonClick = (userId) => {
    navigate(`/admin/event-edit/${userId}`);
  };

  const createEventButton = () => {
    navigate(`/admin/event-create`); 
  };

  const returnPreviousPage = () => {
    navigate(`/admin/event-edit/${id}`);
  };


  const deleteEvent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Inscription supprimée avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    //  await fetchEventSubscriptions(page, size);
    } catch (error) {
      toast.error('Erreur lors de la suppression de l%inscription.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container">
    <h1 className="mb-0">Liste des inscription de l'évenements</h1>


   <div className="d-flex justify-content-between align-items-center mt-3">
   <button className="return-button" onClick={returnPreviousPage}>retour</button>

    <button className="action-button detail" onClick={createEventButton}>
    Créer 
    </button>
  </div>
      <div className="table-responsive">
      {eventSubscriptions.length == 0 ? (
        <div className="alert alert-info text-center">
          Aucune inscription trouver trouvé.
        </div>
      ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>prenom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventSubscriptions.map((subscription) => (
            <tr key={subscription.uuid}>
              <td>{subscription?.name}</td>
              <td>{subscription?.firstname}</td>
              <td>
              <button className="action-button detail" onClick={() => detailButtonClick(subscription.uuid)}>
              <i className="bi bi-search"></i>
              </button>
              <button className="action-button remove" onClick={() => handleUnsubscribe(subscription.uuid)}>
                
              <i className="bi bi-trash"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>           
       {eventSubscriptions.length > 0 && (
      <div className="pagination-controls">
            <div className="pagination-buttons centered-button">
        <div className="pagination-info">
          {page + 1} / {totalPages}
        </div>
            </div>
            <div className="pagination-buttons centered-button">
              <button onClick={previousPage} className="buttonPagination" disabled={page === 0}>
                &lt;
              </button>
              <button onClick={nextPage} className="buttonPagination" disabled={page === totalPages}>
                &gt;
              </button>
            </div>
          </div>
           )}
          <ToastContainer />
    </div>
    
  );
}

export default EventSubscriptionList;
