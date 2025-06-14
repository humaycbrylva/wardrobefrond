import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    stylePreference: '',
    profileEmoji: '',
    profileColor: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const res = await axios.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('accessToken', res.data.accessToken);
      alert('Qeydiyyat uğurludur');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Ad" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Şifrə" onChange={handleChange} />
      <input name="birthday" type="date" onChange={handleChange} />
      <input name="stylePreference" placeholder="Geyim tərzi" onChange={handleChange} />
      <input name="profileEmoji" placeholder="Emoji (😊)" onChange={handleChange} />
      <input name="profileColor" type="color" onChange={handleChange} />
      <select name="gender" onChange={handleChange}>
        <option value="">Cins</option>
        <option value="Kişi">Kişi</option>
        <option value="Qadın">Qadın</option>
        <option value="Digər">Digər</option>
      </select>
      <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
      <button type="submit">Qeydiyyat</button>
    </form>
  );
};

export default Register;




