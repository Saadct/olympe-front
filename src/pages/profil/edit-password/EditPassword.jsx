import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
        const token = localStorage.getItem('token');
      const response = await axios.patch('http://localhost:8080/auth/updatePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword
      },
    {
        headers: {
            'Authorization': `Bearer ${token}`
          }

    });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Une erreur est survenue lors de la mise à jour du mot de passe.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Changer le mot de passe</h2>
      <Link to="/user/profil" className="btn btn-primary">retour</Link> 

      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="oldPassword">Ancien mot de passe:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nouveau mot de passe:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type="submit">Changer le mot de passe</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
