import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import styles from './AdminPanel.module.css';
import UpdateUserModal from './UpdateUserModal'

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('İstifadəçiləri almaq mümkün olmadı:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('İstifadəçini silmək istədiyinizə əminsiniz?');
    if (!confirmed) return;
    try {
      await axios.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('İstifadəçi silinmədi:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.adminPanel}>
      <h2>👮‍♀️ Admin Panel</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Cins</th>
            <th>Geyim Tərzi</th>
            <th>Profil Şəkli</th>
            <th>Admin?</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
              <td>{u.style}</td>
              <td>
                {u.profileImage ? (
                  <img
                    src={`http://localhost:5000/uploads/${u.profileImage}`}
                    alt="profil"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                  />
                ) : (
                  '—'
                )}
              </td>
              <td>{u.isAdmin ? '✔️' : '❌'}</td>
              <td>
                <button onClick={() => setEditingUserId(u._id)}>Redaktə et</button>
                <button onClick={() => handleDelete(u._id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUserId && (
        <UpdateUserModal
          userId={editingUserId}
          onClose={() => setEditingUserId(null)}
          onUpdated={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminPanel;


