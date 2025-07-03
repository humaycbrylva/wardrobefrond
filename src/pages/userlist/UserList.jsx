import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket/Socket';
import styles from './UserList.module.css';

const UserList = ({ onSelectUser, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [previews, setPreviews] = useState({});
  const currentUser = useSelector((state) => state.user.user);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:5000/api/user/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      console.log('🧠 Gələn istifadəçi dataları:', data);

      const filteredUsers = data.users.filter((u) => u._id !== data.currentUserId);
      setUsers(filteredUsers);
    } catch (err) {
      console.error('❌ İstifadəçilər alınmadı:', err);
    }
  };

  fetchUsers();
}, []);


  // Online olan userId-ləri dinlə
  useEffect(() => {
    socket.on('onlineUsers', (onlineIds) => {
      setOnlineUserIds(onlineIds);
    });

    return () => {
      socket.off('onlineUsers');
    };
  }, []);

  // Yeni mesaj preview-larını dinlə
  useEffect(() => {
    const handlePreview = (msg) => {
      if (msg.senderId !== selectedUserId) {
        setPreviews(prev => ({
          ...prev,
          [msg.senderId]: msg.text,
        }));
      }
    };

    socket.on('receiveMessage', handlePreview);
    return () => socket.off('receiveMessage', handlePreview);
  }, [selectedUserId]);

  return (
    <div className={styles.userListContainer}>
      <h3 className={styles.title}>İstifadəçilər</h3>
      {users.map(user => {
        const isOnline = onlineUserIds.includes(user._id);
        const preview = previews[user._id];

        return (
          <div
            key={user._id}
            className={`${styles.userItem} ${user._id === selectedUserId ? styles.active : ''}`}
            onClick={() => {
              onSelectUser(user._id);
              setPreviews(prev => {
                const updated = { ...prev };
                delete updated[user._id];
                return updated;
              });
            }}
          >
            <div className={styles.avatarWrapper}>
              <img
                src={`http://localhost:5000/uploads/${user.profileImage}`}
                alt={user.profileImage}
                className={styles.avatar}
              />
              <span className={isOnline ? styles.onlineDot : styles.offlineDot} />
            </div>
            <div className={styles.userInfo}>
              <strong>{user.name}</strong>
              {preview && <p className={styles.preview}>{preview}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;