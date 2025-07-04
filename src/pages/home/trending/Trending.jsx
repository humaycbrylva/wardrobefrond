import React, { useEffect, useState } from 'react';
import axios from '../../../services/axiosInstance';
import styles from './Trending.module.css';
import TrendModel from './TrendModel';

const Trending = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const res = await axios.get('/trends');
      setTrends(res.data);
    } catch (err) {
      setError('Trend parçalar yüklənmədi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trends/${id}`);
      setTrends((prev) => prev.filter((item) => item._id !== id));
      setSelectedItem(null);
    } catch (err) {
      console.error('Silinmə zamanı xəta:', err);
    }
  };

  const handleEdit = (item) => {
    alert(`Edit etmək üçün: ${item.title}`);
  };

  if (loading) return <div className={styles.loading}>Yüklənir...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.trendingsection}>
      <h2>Ən Trend Parçalar</h2>
      <div className={styles.trendcards}>
        {trends.slice(0, 9).map((item) => (
          <div key={item._id} className={styles.trendcard}>
            <div className={styles.imagecontainer}>
              <img
                src={`http://localhost:5000/trending/${item.mainImage}`} // Burada mainImage istifadə olunur
                alt={item.title}
              />
              <div className={styles.overlay}>
                <button onClick={() => setSelectedItem(item)}>Ətraflı bax</button>
              </div>
            </div>
            <div className={styles.trendinfo}>
              <h3>{item.title}</h3>
              <p>{item.brand}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <TrendModel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Trending;
