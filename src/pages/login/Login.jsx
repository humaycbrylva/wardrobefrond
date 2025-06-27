import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      setMessage(res.data.message);
      setMessageType('success');

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', user._id);

      dispatch(setUser(user)); // ✅ Redux-a user göndər

      // ✅ Adminsə admin panelinə, deyilə profilə yönləndir
      setTimeout(() => {
  navigate('/profile');
}, 1000);

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




