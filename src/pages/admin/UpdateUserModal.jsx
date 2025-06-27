import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import styles from './UpdateUserModal.module.css';

const UpdateUserModal = ({ userId, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    style: '',
    isAdmin: false,
    profileImage: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/user/${userId}`);
        setForm(res.data);
      } catch (err) {
        console.error('İstifadəçi yüklənmədi:', err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/user/${userId}`, form);
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Yeniləmə uğursuz oldu:', err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>İstifadəçini Redaktə Et</h3>
        <form onSubmit={handleSubmit}>
          <label>Ad:</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} required />

          <label>Cins:</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Seç</option>
            <option value="Kişi">Male</option>
            <option value="Qadın">Female</option>
          </select>

          <label>Stil:</label>
          <input name="style" value={form.style} onChange={handleChange} />

          <label>Admin?</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={form.isAdmin}
            onChange={handleChange}
          />

          <button type="submit">Yadda saxla</button>
          <button type="button" onClick={onClose}>Bağla</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
