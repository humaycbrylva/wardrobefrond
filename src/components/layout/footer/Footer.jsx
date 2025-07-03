import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import axios from '../../../services/axiosInstance';
import styles from './Footer.module.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.post('/contact', formData);
      setSuccessMsg('Mesajınız uğurla göndərildi!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMsg('Mesaj göndərilmədi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Sol tərəf: Haqqımızda və Əlaqə (alt-alta) */}
        <div className={styles.leftColumn}>
          <div className={styles.aboutSection}>
            <h3>Haqqımızda</h3>
            <p>
              Wardrobe+ layihəsinin məqsədi rahatlıqla geyim seçimləri yaratmaq və stilinizi
              ən yaxşı şəkildə ifadə etməkdir.
            </p>
          </div>

          <div className={styles.contactSection}>
            <h3>Əlaqə</h3>
            <p><strong>Email:</strong> info@wardrobeplus.az</p>
            <p><strong>Telefon:</strong> +994 50 123 45 67</p>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Sağ tərəf: Mesaj formu */}
        <div className={styles.rightColumn}>
          <h3>Bizə Yazın</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Ad, Soyad"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <textarea
              name="message"
              placeholder="Mesajınız"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            <button type="submit" disabled={loading} className={styles.btn}>
              {loading ? 'Göndərilir...' : 'Göndər'}
            </button>
            {successMsg && <p className={styles.success}>{successMsg}</p>}
            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          </form>
        </div>
      </div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Wardrobe+. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
};

export default Footer;
