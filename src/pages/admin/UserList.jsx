import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance'
import styles from './AdminPanel.module.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get('/admin/user-products-summary');
      setUsers(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>İstifadəçilər və Məhsul Sayı</h2>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Məhsul sayı</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} onClick={() => navigate(`/admin/products/${u._id}`)} className={styles.clickable}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.productCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
