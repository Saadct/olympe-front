import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserList.css"
import { useNavigate } from 'react-router-dom'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate(); 


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get(`${process.env.REACT_APP_API_URL}/users/check-connected-admin`, {
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

  const fetchUsers = async (page, size) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/users/paginated/${page}/${size}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(response.data[0]);
      setTotalPages(response.data[1]);
      console.log(response.data);

    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

    useEffect(() => {
      setSize(size);
      fetchUsers(page, size);
    }, [page, size]);

  const nextPage = async () => {
    if (page < totalPages - 1) { 
      setPage(page + 1);
    }
  };
  
  const previousPage = async () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const detailButtonClick = (userId) => {
    navigate(`/admin/user-edit/${userId}`);
  };

  const createButtonClick = () => {
    navigate(`/admin/user-create`);
  };

  return (
    <div className="container">
    <h1 className="mb-0">Liste des utilisateurs</h1>

   <div className="d-flex justify-content-between align-items-center">
    <div></div>
    <button className="action-button detail" onClick={createButtonClick}>
    Créer 
    </button>
  </div>
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uuid}>
              <td>{user?.fullName}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
              <button className="action-button detail" onClick={() => detailButtonClick(user.uuid)}>
              <i className="bi bi-search"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination-controls">
            <div className="pagination-buttons centered-button">
              <div>
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
    </div>
    
  );
}

export default UserList;
