import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importez Link depuis react-router-dom si vous utilisez des routes

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate(); 

  const fetchUsers = async (page, size) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/categories/${page}/${size}`);
      setCategories(response.data[0]);
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

  const detailButtonClick = (userId) => {
    navigate(`/admin/category-edit/${userId}`);
  };

  return (
    <div className="container">
    <h1 className="mb-0">Liste des Categories</h1>

   <div className="d-flex justify-content-between align-items-center">
    <div></div>
    <button className="action-button detail">
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
              <button className="action-button remove">
                
              <i className="bi bi-trash"></i>
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

export default CategoryList;
