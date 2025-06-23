import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './OtpVerify.module.css';

const OtpVerify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: email.trim(),
        otp: otp.trim(),
      });

      setMessage(res.data.message);
      setMessageType('success');

      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP təsdiqlənmədi');
      setMessageType('error');
    }
  };

  return (
    <div className={styles.otpContainer}>
      <form className={styles.otpForm} onSubmit={handleVerify}>
        <h2>OTP Təsdiqləmə</h2>

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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP kodu"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Təsdiqlə</button>
      </form>
    </div>
  );
};

export default OtpVerify;
