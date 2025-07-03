import React, { useEffect, useState } from 'react';
import axios from '../../../services/axiosInstance'
import { io } from 'socket.io-client';
import styles from './Contact.module.css';

const socket = io('http://localhost:5000');

const ContactRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();

    socket.on('newContactRequest', (newRequest) => {
      setRequests(prev => [newRequest, ...prev]);
    });

    return () => socket.off('newContactRequest');
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/contact', { withCredentials: true });
      setRequests(res.data);
    } catch (err) {
      console.error('Contact requests alınmadı', err);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.put(`/contact/${id}/read`, {}, { withCredentials: true });
      setRequests(prev => prev.map(r => r._id === id ? { ...r, read: true } : r));
    } catch (err) {
      console.error('Oxundu kimi işarələmə alınmadı', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>İstək Mesajları</h2>
      {requests.map(req => (
        <div
          key={req._id}
          className={styles.requestCard}
          style={{ backgroundColor: req.read ? '#f9f9f9' : 'white' }}
        >
          <p className={styles.requestHeader}>
            {req.name}
            <span className={styles.requestEmail}>({req.email})</span>
          </p>
          <p className={styles.requestMessage}>{req.message}</p>
          <button
            className={styles.readButton}
            disabled={req.read}
            onClick={() => markRead(req._id)}
          >
            {req.read ? 'Oxundu' : 'Oxundu kimi işarələ'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactRequests;
