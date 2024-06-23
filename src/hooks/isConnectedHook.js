// src/hooks/useIsConnected.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const checkConnection = () => {
      if (!token) {
        setIsConnected(false);
        return;
      }

      try {
        const response = axios.get('http://localhost:8080/users/check-connected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200 ) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion:', error);
        setIsConnected(false);
      } 
    };
    checkConnection();
    
  }, []);

  if(isConnected === false){
    return false;
    }
    if(isConnected === true){
      return true;
    }
};

export default useIsConnected;
