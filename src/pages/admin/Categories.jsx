import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import styles from './Categories.module.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClosetCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/admin/closet-categories');
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        setError('Kateqoriyalar alınmadı');
        setLoading(false);
      }
    };
    fetchClosetCategories();
  }, []);

  const handleDelete = async (category) => {
    if (!window.confirm(`${category} kateqoriyasını və ona aid bütün məhsulları silmək istəyirsiniz?`)) return;

    try {
      await axios.delete(`/admin/closet-categories/${encodeURIComponent(category)}`);
      setCategories(prev => prev.filter(cat => cat.category !== category));
    } catch (err) {
      alert(err.response?.data?.message || 'Silinmə xətası');
    }
  };

  const handleEdit = async (category) => {
    const newCategory = prompt(`${category} kateqoriyasının yeni adını daxil edin:`);
    if (!newCategory || newCategory.trim() === '') return;

    try {
      await axios.put(`/admin/closet-categories/${encodeURIComponent(category)}`, { newCategory: newCategory.trim() });
      setCategories(prev =>
        prev.map(cat => (cat.category === category ? { ...cat, category: newCategory.trim() } : cat))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Yenilənmə xətası');
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <h2>Closet Kateqoriyaları və Məhsul Sayı</h2>
      {categories.length === 0 ? (
        <p>Kateqoriya yoxdur</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>№</th>
              <th>Kateqoriya</th>
              <th>Məhsul sayı</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ category, count }, idx) => (
              <tr key={category}>
                <td>{idx + 1}</td>
                <td>{category}</td>
                <td>{count}</td>
                <td>
                  <button onClick={() => handleEdit(category)}>Redaktə</button>
                  <button onClick={() => handleDelete(category)} style={{ marginLeft: 8, color: 'red' }}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
