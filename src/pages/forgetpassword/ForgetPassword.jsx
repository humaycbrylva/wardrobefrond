import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ForgetPassword.module.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      localStorage.setItem('resetEmail', email); // email-i yadda saxla
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.forgotContainer}>
  <form className={styles.forgotForm} onSubmit={handleSubmit}>
    <h2>Şifrəni Unutdun?</h2>
    {message && <p className={styles.message}>{message}</p>}
    <input
      type="email"
      placeholder="Emailinizi daxil edin"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <button type="submit">OTP göndər</button>
  </form>
</div>

  );
};

export default ForgotPassword;
