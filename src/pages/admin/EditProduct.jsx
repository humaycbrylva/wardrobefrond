import React, { useState } from 'react';
import axios from '../../services/axiosInstance';
import styles from './EditProduct.module.css'; // ayrıca CSS yazacaqsan

const EditProduct = ({ product, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    category: product.category || '',
    brand: product.brand || '',
    size: product.size || '',
    color: product.color || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/products/${product._id}`, formData);
      onSaved();
    } catch (err) {
      alert('Yeniləmə xətası');
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Məhsulu Redaktə Et</h3>
        <form onSubmit={handleSubmit}>
          <label>Kateqoriya</label>
          <input name="category" value={formData.category} onChange={handleChange} />

          <label>Brend</label>
          <input name="brand" value={formData.brand} onChange={handleChange} />

          <label>Ölçü</label>
          <input name="size" value={formData.size} onChange={handleChange} />

          <label>Rəng</label>
          <input name="color" value={formData.color} onChange={handleChange} />

          <button type="submit" disabled={saving}>Yadda Saxla</button>
          <button type="button" onClick={onClose} disabled={saving}>Bağla</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
