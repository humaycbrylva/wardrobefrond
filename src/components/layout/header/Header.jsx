import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/logos.png';
import logo1 from '../../../assets/enter_14497994.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome } from 'react-icons/fa';
import { logout } from '../../../redux/reducers/userSlice';

const Header = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navdiv}>

          {/* SOL TƏRƏF – HOME və Submenu */}
          <div
            className={styles.left}
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <i className={styles.icon}><FaHome /></i>
            <Link className={styles.link1} to="/">Home</Link>

            {showSubmenu && (
              <div className={styles.submenu}>
                {user?.isAdmin && (
                  <Link className={styles.link1} to="/admin">Admin Panel</Link>
                )}
              
                <Link className={styles.link1} to="/closet">Closet</Link>
                <Link className={styles.link1} to="/planner">Planner</Link>
                <Link className={styles.link1} to="/profile">Profile</Link>
                <Link className={styles.link1} to="/chat">Mesajlar</Link>
              </div>
            )}
          </div>

          {/* ORTA – Logo */}
          <div className={styles.center}>
            <img src={logo} alt="Wardrobe+ Logo" />
          </div>

          {/* SAĞ – LOGIN/SIGNIN və ya ÇIXIŞ */}
          <div className={styles.login}>
            {user ? (
              <div className={styles.right}>
                <span className={styles.link2}>{user.name}</span>
                <button className={styles.btn1} onClick={handleLogout}>ÇIXIŞ</button>
              </div>
            ) : (
              <div className={styles.right}>
                <img src={logo1} alt="Login Icon" />
                <Link className={styles.link2} to="/login">LOGIN</Link>
                <h1>/</h1>
                <Link className={styles.link2} to="/signin">SIGNIN</Link>
              </div>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Header;
