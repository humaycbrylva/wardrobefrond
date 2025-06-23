import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Profil yüklənmədi:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Yüklənir...</p>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {profile.profileImage && (
          <img
            src={`http://localhost:5000/uploads/${profile.profileImage}`}
            alt="Profil şəkli"
            className={styles.profileImage}
          />
        )}
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Cins:</strong> {profile.gender}</p>
        <p><strong>Stil:</strong> {profile.style}</p>

        {/* Düymə profil məlumatlarının ALTINDA */}
        <button
          onClick={() => navigate('/edit-profile')}
          style={{
            marginTop: '25px',
            padding: '10px 20px',
            backgroundColor: '#8a2be2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Profili redaktə et
        </button>
        <button
  onClick={() => navigate('/change-password')}
  style={{
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  }}
>
  Şifrəni dəyiş
</button>
      </div>
    </div>
  );
};

export default Profile;



