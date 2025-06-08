import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/logo-Photoroom-Photoroom (2).jpg';
import logo1 from '../../../assets/enter_14497994.png';

import { Link } from 'react-router-dom'; // düzəliş
import { FaHome } from 'react-icons/fa';

const Header = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

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
            <Link className={styles.link1} to="/home">Home</Link>

            {showSubmenu && (
              <div className={styles.submenu}>
                <Link className={styles.link1} to="/admin">Admin</Link>
                <Link className={styles.link1} to="/users">User List</Link>
                <Link className={styles.link1} to="/closet">Closet</Link>
                <Link className={styles.link1} to="/planner">Planner</Link>
              </div>
            )}
          </div>

          {/* ORTA – Logo */}
          <div className={styles.center}>
            <img src={logo} alt="Wardrobe+ Logo" />
          </div>

          {/* SAĞ – Login və Register */}
          <div className={styles.right}>
            <img src={logo1} alt="Login Icon" />
            <Link className={styles.link2} to="/login">LOGIN</Link>
            <h1>/</h1>
            <Link className={styles.link2} to="/register">SIGNIN</Link>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Header;

