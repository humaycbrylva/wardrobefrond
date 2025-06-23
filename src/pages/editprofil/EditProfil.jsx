import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfil.module.css';


const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    style: '',
    gender: '',
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name || '',
          style: res.data.style || '',
          gender: res.data.gender || '',
          profileImage: null,
        });
        if (res.data.profileImage) {
          setPreview(`http://localhost:5000/uploads/${res.data.profileImage}`);
        }
      } catch (err) {
        setMessage('Profil məlumatı yüklənmədi');
        setMessageType('error');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('style', formData.style);
    data.append('gender', formData.gender);

    if (formData.profileImage) {
      data.append('profileImage', formData.profileImage);
    }

    try {
      await axios.put('http://localhost:5000/api/user/update', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profil uğurla yeniləndi');
      setMessageType('success');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setMessage('Profil yenilənmədi');
      setMessageType('error');
    }
  };

  return (
  <div className={styles.editProfileContainer}>
    <form className={styles.editProfileForm} onSubmit={handleSubmit}>
      <h2>Profil Redaktəsi</h2>

      {message && (
        <div
          className={messageType === 'success' ? styles.successMessage : styles.errorMessage}
        >
          {message}
        </div>
      )}

      {preview && (
        <img
          src={preview}
          alt="Profil"
          className={styles.profilePreviewImage}
        />
      )}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ad"
        required
      />
      <input
        type="text"
        name="style"
        value={formData.style}
        onChange={handleChange}
        placeholder="Geyim stili"
      />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Cinsiyyət</option>
        <option value="male">Kişi</option>
        <option value="female">Qadın</option>
      </select>
      <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
      <button type="submit">Yadda saxla</button>
    </form>
  </div>
);
}
export default EditProfile;

