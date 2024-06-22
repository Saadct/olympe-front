import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './log-out.css';

const LogOut = ({ setIsLoggedIn }) => {
  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }, [setIsLoggedIn]);

  return (
    <div className="logout-container container">
      <h2 className="text-danger mb-4">Vous êtes déconnecté</h2>
      <p className="text-muted mb-4">
        Vous êtes déconnecté. Vous pouvez vous reconnecter en utilisant le formulaire de connexion.
      </p>
      <Link to="/dashboard" className="btn btn-outline-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default LogOut;
