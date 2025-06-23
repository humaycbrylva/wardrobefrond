import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const res = await axios.put('http://localhost:5000/api/user/change-password', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setMessageType('success');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Xəta baş verdi');
      setMessageType('error');
    }
  };

  return (
    <div className={styles.newPasswordContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Şifrəni dəyiş</h2>

      {message && (
        <div className={`${styles.messageBox} ${styles[messageType]}`}>
          {message}
        </div>
      )}

      <input
        className={styles.inputField}
        type="password"
        name="currentPassword"
        placeholder="Cari şifrə"
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        type="password"
        name="newPassword"
        placeholder="Yeni şifrə"
        onChange={handleChange}
        required
      />
      <input
        className={styles.inputField}
        type="password"
        name="confirmPassword"
        placeholder="Yeni şifrə təkrarı"
        onChange={handleChange}
        required
      />
      <button className={styles.submitButton} type="submit">
        Yadda saxla
      </button>
    </form>

    </div>
    
  );
};

export default ChangePassword;

