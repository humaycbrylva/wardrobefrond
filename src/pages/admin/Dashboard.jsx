import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
  try {
    const res = await axios.get('/admin/stats');
    console.log('Stats API response:', res.data); // buraya bax
    setStats(res.data);
    setLatestUsers(res.data.latestUsers || []);
    setLatestProducts(res.data.latestProducts || []);
  } catch (err) {
    console.error('Statistik məlumatlar alınmadı:', err);
  }
};

    fetchStats();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>👮‍♀️ Admin Dashboard</h2>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>İstifadəçilər</h3>
          <p>{stats.totalUsers || 0}</p>
        </div>
        <div className={styles.card}>
          <h3>Məhsullar</h3>
          <p>{stats.totalProducts || 0}</p>
        </div>
        <div className={styles.card}>
          <h3>Kateqoriyalar</h3>
          <p>{stats.totalCategories || 0}</p>
        </div>
        <div className={styles.card}>
          <h3>Dəstək Gəliri</h3>
          <p>{stats.totalIncome || 0} ₼</p>
        </div>
      </div>

      <h3>🆕 Son Qeydiyyat edənlər</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Tarix</th>
          </tr>
        </thead>
        <tbody>
          {latestUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>🛍️ Son Əlavə Olunan Məhsullar</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Məhsul</th>
            <th>Tarix</th>
          </tr>
        </thead>
        <tbody>
          {latestProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

