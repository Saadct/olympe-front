import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogOut = ({setIsLoggedIn}) => {
  //const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }, [setIsLoggedIn]);

  return (
    <div>
      <h2>Vous avez été déconnecté</h2>
      <p>Vous avez été déconnecté avec succès. Vous pouvez vous reconnecter en utilisant le formulaire de connexion.</p>
      <Link to="/dashboard">Retour à l'accueil</Link>

    </div>
  );
};

export default LogOut;
