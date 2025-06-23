import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    style: '',
    profileImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      alert(res.data.message);
      navigate('/verify');
    } catch (err) {
      alert(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Qeydiyyat</h2>
        <input type="text" name="name" placeholder="Ad" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Təkrar Şifrə" onChange={handleChange} required />
        
        <select name="gender" onChange={handleChange} required>
          <option value="">Cinsiyyət seçin</option>
          <option value="male">Kişi</option>
          <option value="female">Qadın</option>
        </select>

        <input type="text" name="style" placeholder="Geyim stili" onChange={handleChange} />
        <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
        <button type="submit">OTP ilə qeydiyyat</button>
      </form>
    </div>
  );
};

export default Register;

