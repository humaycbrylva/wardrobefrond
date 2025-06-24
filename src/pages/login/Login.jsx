import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      setMessage(res.data.message);
      setMessageType('success');
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('userId', res.data.user._id); 
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Giriş zamanı xəta baş verdi');
      setMessageType('error');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Login</h2>

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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* "Parolumu unutdum?" linki */}
        <div className={styles.forgotPasswordWrapper}>
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>
            Parolumu unutdum?
          </Link>
        </div>

        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;



