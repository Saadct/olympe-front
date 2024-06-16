import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./category-edit.css"

const CategoryEdit = () => {
  const [type, setType] = useState('');
  const [editableType, setEditableType] = useState('');
  const [name, setName] = useState('');
  const [editableName, setEditableName] = useState('');
  const navigate = useNavigate(); 
  const{ id } = useParams("id");
  const [isEditingCategory, setIsEditingCategory] = useState(false);


  useEffect(() => {
    axios.get(`http://localhost:8080/categories/${id}`)
    .then(response => {
      setEditableType(response.data.type);
      setType(response.data.type);
      setName(response.data.name);
      setEditableName(response.data.name);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de la category:', error);
    });
  }, []);

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setEditableType(value);
    } else if (name === 'name') {
      setEditableName(value);
    }
  };


  const handleEditCategory = () => {
    setIsEditingCategory(true);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:8080/categories/${id}`, 
      { type: editableType, name: editableName}
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setIsEditingCategory(false);
        setEditableName(editableName);
        setName(editableName);
        setEditableType(editableType);
        setType(editableType)
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la category:', error);
      });
  };


  const handleEventById = () => {
    navigate(`/admin/category-list-event/${id}`);
  };


  const returnPreviousPage = () => {
    navigate('/admin/category-list');
  };

  return (
    <div>
      <h1 className='headerProfil'>La category</h1>
      <button className="return-button" onClick={returnPreviousPage}>retour</button>

      <div className="profile-container">
        <div className="profile-header">
          <h1 onClick={handleEditCategory}>{isEditingCategory ? <input type="text" name="name" value={editableName} onChange={handleCategoryChange} className="input-edit"/> : "nom: "+ name}</h1>
          {!isEditingCategory && (
            <button className="edit-button" onClick={() => setIsEditingCategory(true)}>Edit Category</button>
          )}
        </div>
        <h1 onClick={handleEditCategory}>{isEditingCategory ? <input type="text" name="type" value={editableType} onChange={handleCategoryChange} className="input-edit"/> : "type: " + (type ? type : "")}</h1>

        {isEditingCategory && (
          <form onSubmit={handleCategorySubmit} className="edit-form mb-3">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditingCategory(false)}>Cancel</button>
          </form>
          
        )}
       
        <button className="action-button mt-3" onClick={handleEventById}>Voir les évènements liés</button>

      </div>
    </div>
  );
};

export default CategoryEdit;
