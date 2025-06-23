import React, { useState } from 'react';
import axios from 'axios';
import styles from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
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
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', formData);
      setMessage(res.data.message);
      setMessageType('success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Xəta baş verdi');
      setMessageType('error');
    }
  };

  return (
    <div className={styles.resetContainer}>
      <form className={styles.resetForm} onSubmit={handleSubmit}>
        <h2>Yeni şifrə təyin et</h2>

        {message && (
          <div
            className={
              messageType === 'success'
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="OTP kod"
          value={formData.otp}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Yeni şifrə"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Yeni şifrə təkrarı"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Təyin et</button>
      </form>
    </div>
  );
};

export default ResetPassword;
