import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './user-edit.css'
import { ToastContainer, toast } from 'react-toastify';



const UserEdit = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  const fetchUser = useCallback(async () =>{
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/users/informations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setFullname(response.data.fullName);
      setEmail(response.data.email);
      setFirstname(response.data.firstName);
      setName(response.data.name);
      setRole(response.data.role);

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de profil:', error);
    });
  }, [id])

  const handleRole = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:8080/users/change-role/${id}`,{}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Changement de role effectué avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchUser();
    //  await fetchEventSubscriptions(page, size);
    } catch (error) {
      toast.error('Erreur lors du changement du role.', {
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


  const handleTickets = () => {
    navigate(`/admin/user-edit/ticket-list/${id}`);
  };



  const returnToTheList = () => {
    navigate('/admin/user-list');
  };

  useEffect(() => {
    fetchUser();
  }, [id, fetchUser]);

  return (
    <div>
      <h1 className='headerProfil'>Profil de l'utilisateur</h1>

      <button type="button" className="return-button" 
      onClick={returnToTheList}>
        Retour</button>

      <div className="profile-container">
        <div className="profile-header">
        <h1>nom complet *: {fullname}</h1>        
        </div>
        <p>email : {email}</p>
        <p>Nom:  {name} </p>
        <p>Prenom; {firstName} </p>
        <p>Role: {role} </p>
       
        <button className="change-password-button" onClick={handleTickets}>Voir ses tickets</button>
        <button className="change-password-button" onClick={handleRole}>Changer son role</button>

      </div>
      <ToastContainer />

    </div>
  );
};

export default UserEdit;
