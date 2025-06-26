import React, { useEffect, useState } from 'react';
import styles from './Closet.module.css';
import axios from '../../services/axiosInstance';
import { useSelector } from 'react-redux';

const Closet = () => {
  const user = useSelector((state) => state.user.user);
  const [clothes, setClothes] = useState([]);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Köynək');

  const categoryOptions = ['Köynək','Canta', 'Don', 'Cins', 'Ayaqqabı', 'Ətək', 'Papaq', 'Şalvar'];

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const res = await axios.get('/closet');
      setClothes(res.data);
    } catch (err) {
      console.error('Geyimlər alınmadı:', err);
    }
  };

  const groupedClothes = clothes.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('color', color);

    try {
      await axios.post('/closet', formData);
      resetForm();
      fetchClothes();
    } catch (err) {
      console.error('Geyim əlavə olunmadı:', err?.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/closet/${id}`);
      fetchClothes();
    } catch (err) {
      console.error('Silinmədi:', err);
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('color', color);

    try {
      await axios.put(`/closet/${id}`, formData);
      resetForm();
      fetchClothes();
    } catch (err) {
      console.error('Redaktə olunmadı:', err);
    }
  };

  const resetForm = () => {
    setImage(null);
    setCategory('');
    setBrand('');
    setSize('');
    setColor('');
    setEditingId(null);
  };

  if (!user) return <p>Yüklənir...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <img
          src={`http://localhost:5000/uploads/${user.profileImage}`}
          alt={user.profileImage}
          className={styles.avatar}
        />
        <h2>{user.name} - Geyimlərim 👕</h2>
      </div>

      <form onSubmit={editingId ? (e) => handleEdit(e, editingId) : handleAdd} className={styles.form}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required={!editingId} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Kateqoriya seçin</option>
          {categoryOptions.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="text" placeholder="Marka" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <input type="text" placeholder="Ölçü" value={size} onChange={(e) => setSize(e.target.value)} required />
        <input type="text" placeholder="Rəng" value={color} onChange={(e) => setColor(e.target.value)} required />
        <button type="submit">{editingId ? 'Yadda saxla' : 'Əlavə et'}</button>
      </form>

      <div className={styles.layout}>
        <div className={styles.categoryBoxContainer}>
          {categoryOptions.map((cat, idx) => (
            <div
              key={idx}
              className={`${styles.categoryBox} ${selectedCategory === cat ? styles.selected : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <img src={`/images/categories/${cat.toLowerCase()}.png`} alt={cat} />
              <span>{cat}</span>
            </div>
          ))}
        </div>

        <div className={styles.clothesDisplayPanel}>
          <h3>{selectedCategory}</h3>
          <div className={styles.clothesList}>
            {groupedClothes[selectedCategory]?.map((item) => (
              <div key={item._id} className={styles.clothingItem}>
                <img src={`http://localhost:5000/closet/${item.image}`} alt="geyim" />
                <p><strong>Marka:</strong> {item.brand}</p>
                <p><strong>Ölçü:</strong> {item.size}</p>
                <p><strong>Rəng:</strong> {item.color}</p>
                <div className={styles.actions}>
                  <button onClick={() => {
                    setEditingId(item._id);
                    setCategory(item.category);
                    setBrand(item.brand);
                    setSize(item.size);
                    setColor(item.color);
                  }}>✏️</button>
                  <button onClick={() => handleDelete(item._id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closet;



