import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?!;*@#$%^&-+=()])(?=\S+$).{8,20}$/;
  const [message, setMessage] = useState('');


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



  const inputChange = (e) => {
    setMessage('');
    const { name, value } = e.target;

    if (name ==='oldpassword' || name === 'newpassword' || name === 'confirmpassword'  && !passwordRegex.test(value)) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères et peut aller jusqu/à 20 caractères. Il doit inclure au moins un chiffre, une lettre minuscule, une lettre majuscule, et l/un des caractères spéciaux suivants : /?!;*@#$%^&-+=()/. De plus, aucun espace blanc n/est autorisé dans le mot de passe.');
    }
    if(name === 'oldpassword'){
      setOldPassword(value);
    }else if(name === 'newpassword'){
      setNewPassword(value);
    }
    else{
      setConfirmPassword(value);
    }
  };



  const changePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/updatePassword`, {
        oldPassword,
        newPassword
      }, {
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
    <div className="d-flex">
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Changer le mot de passe</h2>
              <Link to="/user/profil" className="action-button mb-5">Retour</Link> 

              <form onSubmit={changePassword}>
                <div className="form-group mt-3">
                  <label>Ancien mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldpassword"
                    value={oldPassword}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nouveau mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newpassword"
                    value={newPassword}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmpassword"
                    value={confirmPassword}
                    onChange={inputChange}
                    required
                  />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="action-button">Changer le mot de passe</button>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChangePasswordPage;
