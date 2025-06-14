import { useEffect, useState } from 'react';
import axios from '../../api/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
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
    <div>
      <h2>Profil Məlumatları</h2>
      <p>Ad: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Cins: {profile.gender}</p>
      <p>Geyim tərzi: {profile.stylePreference}</p>
      <p>Doğum tarixi: {new Date(profile.birthday).toLocaleDateString()}</p>
      {profile.profileEmoji && <p>Emoji: {profile.profileEmoji}</p>}
      {profile.profileColor && (
        <p>Rəng: <span style={{ background: profile.profileColor }}>{profile.profileColor}</span></p>
      )}
      {profile.profileImage && (
        <img
          src={`http://localhost:5000/uploads/${profile.profileImage}`}
          alt="Profil şəkli"
          style={{ width: '120px', borderRadius: '10px' }}
        />
      )}
    </div>
  );
};

export default Profile;

