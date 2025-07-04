import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/logos.png';
import logo1 from '../../../assets/enter_14497994.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { logout } from '../../../redux/reducers/userSlice';

const Header = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('az');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Tema toggle funksiyası
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Dil toggle funksiyası
  const toggleLanguage = () => {
    const newLang = language === 'az' ? 'en' : 'az';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    // Saytı açanda saxlanmış temaları və dili yüklə
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Dilə görə mətni dəyişmək üçün qısa map
  const texts = {
    az: {
      home: 'Ana səhifə',
      adminPanel: 'Admin Panel',
      closet: 'Geyimlər',
      planner: 'Planlayıcı',
      profile: 'Profil',
      messages: 'Mesajlar',
      login: 'GİRİŞ',
      signin: 'QEYDİYYAT',
      logout: 'ÇIXIŞ',
      darkMode: 'Gecə rejimi',
      lightMode: 'Gündüz rejimi',
      lang: 'EN',
    },
    en: {
      home: 'Home',
      adminPanel: 'Admin Panel',
      closet: 'Closet',
      planner: 'Planner',
      profile: 'Profile',
      messages: 'Messages',
      login: 'LOGIN',
      signin: 'SIGNIN',
      logout: 'LOGOUT',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      lang: 'AZ',
    },
  };

  const t = texts[language];

  return (
    <nav className={styles.nav}>
      <div className={styles.navdiv}>
        {/* Sol tərəf */}
        <div
          className={styles.left}
          onMouseEnter={() => setShowSubmenu(true)}
          onMouseLeave={() => setShowSubmenu(false)}
        >
          <i className={styles.icon}><FaHome /></i>
          <Link className={styles.link1} to="/">{t.home}</Link>

          {showSubmenu && (
            <div className={styles.submenu}>
              {user?.isAdmin && (
                <Link className={styles.link1} to="/admin">{t.adminPanel}</Link>
              )}
              <Link className={styles.link1} to="/closet">{t.closet}</Link>
              <Link className={styles.link1} to="/planner">{t.planner}</Link>
              <Link className={styles.link1} to="/profile">{t.profile}</Link>
              <Link className={styles.link1} to="/chat">{t.messages}</Link>
            </div>
          )}
        </div>

        {/* Orta logo */}
        <div className={styles.center}>
          <img src={logo} alt="Wardrobe+ Logo" />
        </div>

        {/* Sağ tərəf */}
        <div className={styles.login}>
          
          {user ? (
            <div className={styles.right}>
              <span className={styles.link2}>{user.name}</span>
              <button className={styles.btn1} onClick={handleLogout}>{t.logout}</button>
            </div>
          ) : (
            <div className={styles.right}>
              <img src={logo1} alt="Login Icon" />
              <Link className={styles.link2} to="/login">{t.login}</Link>
              <h1>/</h1>
              <Link className={styles.link2} to="/signin">{t.signin}</Link>
            </div>
          )}

          {/* Tema toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? t.darkMode : t.lightMode}
            className={styles.iconButton}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {/* Dil toggle */}
          <button
            onClick={toggleLanguage}
            title={`Change language to ${language === 'az' ? 'English' : 'Azərbaycan dili'}`}
            className={styles.iconButton}
          >
            {language.toUpperCase()}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Header;
