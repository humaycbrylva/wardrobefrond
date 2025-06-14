import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/logos.png';
import logo1 from '../../../assets/enter_14497994.png';

import { Link, useNavigate } from 'react-router-dom'; // düzəliş
import { FaHome } from 'react-icons/fa';

const Header = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navdiv}>

          {/* SOL TƏRƏF – Yalnız HOME, hover zamanı submenu */}
          <div
            className={styles.left}
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <i className={styles.icon}><FaHome /></i>
            <Link className={styles.link1} to="/">Home</Link>

            {showSubmenu && (
              <div className={styles.submenu}>
                <Link className={styles.link1} to="/admin">Admin</Link>
                <Link className={styles.link1} to="/users">User List</Link>
                <Link className={styles.link1} to="/closet">Closet</Link>
                <Link className={styles.link1} to="/planner">Planner</Link>
                <Link className={styles.link1} to="/profile">Profile</Link>
              </div>
            )}
          </div>

          {/* ORTA – Logo */}
          <div className={styles.center}>
            <img src={logo} alt="Wardrobe+ Logo" />
          </div>

          {/* SAĞ – Login və Register */}
          <div className={styles.login}>
            <div className={styles.right}>
            <img src={logo1} alt="Login Icon" />
            <Link className={styles.link2} to="/login">LOGIN</Link>
            <h1>/</h1>
            <Link className={styles.link2} to="/signin">SIGNIN</Link>
            
          </div>
          <button className={styles.btn1} onClick={handleLogout}>ÇIXIŞ</button>

          </div>
          

        </div>
      </nav>
    </div>
  );
};

export default Header;

