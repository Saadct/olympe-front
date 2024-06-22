import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsConnected from '../../hooks/isConnectedHook';

const ProtectedRoute = ({ children }) => {
  const isConnected = useIsConnected();

  if (isConnected === null) {
    // Vous pouvez retourner un spinner de chargement ou null pendant la vérification
    return <div>Loading...</div>;
  }

  return isConnected ? children : <Navigate to="/deconnexion" />;
};

export default ProtectedRoute;
