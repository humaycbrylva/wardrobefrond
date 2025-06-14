import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      alert('Giriş uğurludur');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Şifrə" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Daxil ol</button>
    </form>
  );
}

export default Login;


