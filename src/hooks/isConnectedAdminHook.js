import { useState, useEffect } from 'react';
import axios from 'axios';

const IsConnectedAdmin = () => {
  const [isConnectedAdmin, setIsConnectedAdmin] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsConnectedAdmin(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/users/check-connected-admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
            setIsConnectedAdmin(true);
        } else {
            setIsConnectedAdmin(false);
        }
      } catch (error) {
        setIsConnectedAdmin(false);
      }
    };

    checkConnection();
  }, []);

  return isConnectedAdmin;
};

export default IsConnectedAdmin;
