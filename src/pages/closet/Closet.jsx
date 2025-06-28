import React, { useEffect, useState } from 'react';
import styles from './Closet.module.css';
import axios from '../../services/axiosInstance';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Closet = () => {
  const loggedInUser = useSelector((state) => state.user.user);
  const { userId } = useParams(); // admin baxırsa userId olacaq
  const [targetUser, setTargetUser] = useState(loggedInUser);
  const [clothes, setClothes] = useState([]);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Köynək');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const categoryOptions = ['Köynək', 'Canta', 'Don', 'Cins', 'Ayaqqabı', 'Ətək', 'Papaq', 'Şalvar'];

  useEffect(() => {
    if (!loggedInUser) return;

    if (userId) {
      fetchTargetUser(); // admin başqasına baxır
    } else {
      fetchClothes();
    }
  }, [userId]);

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`/admin/user/${userId}`); // user datanı al
      setTargetUser(res.data);
      const closetRes = await axios.get(`/admin/user/${userId}/closet`);
      setClothes(closetRes.data);
    } catch (err) {
      console.error('İstifadəçi və geyimlər alınmadı:', err);
    }
  };

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

  const filteredItems = (groupedClothes[selectedCategory] || []).filter(item =>
    (selectedBrand ? item.brand === selectedBrand : true) &&
    (selectedSize ? item.size === selectedSize : true) &&
    (selectedColor ? item.color === selectedColor : true)
  );

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
      userId ? fetchTargetUser() : fetchClothes();
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
      userId ? fetchTargetUser() : fetchClothes();
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

  if (!loggedInUser) return <p>Yüklənir...</p>;
  if (loggedInUser.role === 'admin' && !userId) return <p>Admin olaraq bu səhifəyə baxa bilməzsiniz.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <img
          src={`http://localhost:5000/uploads/${targetUser?.profileImage}`}
          alt={targetUser?.profileImage}
          className={styles.avatar}
        />
        <h2>{targetUser?.name} - Geyimlər 👕</h2>
      </div>

      {loggedInUser._id === targetUser._id && (
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
      )}

      <div className={styles.layout}>
        <div className={styles.categoryBoxContainer}>
          {categoryOptions.map((cat, idx) => (
            <div
              key={idx}
              className={`${styles.categoryBox} ${selectedCategory === cat ? styles.selected : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedBrand('');
                setSelectedSize('');
                setSelectedColor('');
              }}
            >
              <img src={`/images/categories/${cat.toLowerCase()}.png`} alt={cat} />
              <div className={styles.categoryBoxOverlayCenter}>{cat}</div>
            </div>
          ))}
        </div>

        <div className={styles.clothesDisplayPanel}>
          <h3>{selectedCategory}</h3>

          <div className={styles.filters}>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">Bütün markalar</option>
              {[...new Set(groupedClothes[selectedCategory]?.map(i => i.brand))].map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>

            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Bütün ölçülər</option>
              {[...new Set(groupedClothes[selectedCategory]?.map(i => i.size))].map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>

            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Bütün rənglər</option>
              {[...new Set(groupedClothes[selectedCategory]?.map(i => i.color))].map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            <button
              type="button"
              className={styles.resetButton}
              onClick={() => {
                setSelectedBrand('');
                setSelectedSize('');
                setSelectedColor('');
              }}
            >
              Sıfırla
            </button>
          </div>

          <div className={styles.clothesList}>
            {filteredItems.map((item) => (
              <div key={item._id} className={styles.clothingItem}>
                <img src={`http://localhost:5000/closet/${item.image}`} alt="geyim" />
                <p><strong>Marka:</strong> {item.brand}</p>
                <p><strong>Ölçü:</strong> {item.size}</p>
                <p><strong>Rəng:</strong> {item.color}</p>
                {loggedInUser._id === targetUser._id && (
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closet;
