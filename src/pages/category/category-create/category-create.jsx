import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./category-create.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryCreate = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); 


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkConnection = async () => {
      if (!token) {
        window.location.href = "/deconnexion";
      }
      try {
          await axios.get('http://localhost:8080/users/check-connected-admin', {
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



  const categorySubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:8080/categories/create`, 
      { type: type, name: name}
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.success('Catégorie ajoutée avec succès !', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
            navigate('/admin/category-list');
          }, 2000); 

      })
      .catch(error => {
        toast.error('Erreur lors de l\'ajout de la catégorie.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
      });
  };

  const returnPreviousPage = () => {
    navigate('/admin/category-list');
  };
  
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setType(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  return (
    <div className="category-create-page">
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header">
        <h1>Création d'une categorie</h1>

        </div>
        <input type="text" name="name" value={name} onChange={handleCategoryChange} className="input-edit input-spacing" placeholder='nom'/>


        <input type="text" name="type" value={type} onChange={handleCategoryChange} className="input-edit input-spacing" placeholder='type'/> 
          <form onSubmit={categorySubmit} className="edit-form">
            <button type="submit" className="save-button">Save</button>
          </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryCreate;
