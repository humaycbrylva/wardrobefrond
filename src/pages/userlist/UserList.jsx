// src/pages/chat/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';

const UserList = ({ onSelectUser, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const currentUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/all', {
  headers: { Authorization: `Bearer ${token}` }
});
const allUsers = res.data.users || res.data; // Əgər users obyekt içindədirsə
const filtered = allUsers.filter(user => user._id !== currentUserId);
setUsers(filtered);

      } catch (err) {
        console.error('İstifadəçilər alınmadı:', err);
      }
    };

    fetchUsers();
  }, [currentUserId, token]);

  return (
    <div className={styles.userList}>
      <h3>İstifadəçilər</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className={user._id === selectedUserId ? styles.active : ''}
            onClick={() => onSelectUser(user._id)}
          >
            <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt="Profil" />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
