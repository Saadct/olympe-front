// src/hooks/useIsConnected.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsConnected(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/users/check-connected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  return isConnected;
};

export default useIsConnected;
