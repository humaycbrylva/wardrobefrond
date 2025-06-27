import React, { useEffect, useState } from 'react';

import axios from '../../services/axiosInstance';
import { FiTrash2 } from 'react-icons/fi';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('İstifadəçilər alınmadı:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) {
      try {
        await axios.delete(`/admin/user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error('İstifadəçi silinmədi:', err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.section}>
      <h2>Users</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.city || '-'}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(user._id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
