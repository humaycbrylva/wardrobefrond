import React from 'react';
import styles from './AdminSidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaThLarge, FaSignOutAlt, FaList, FaChartBar } from 'react-icons/fa';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/profile');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Admin Panel</div>

      <nav className={styles.nav}>
        <NavLink to="/admin" end className={({ isActive }) => isActive ? styles.active : ''}>
          <FaThLarge className={styles.icon} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaUser className={styles.icon} />
          Users
        </NavLink>

        <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaList className={styles.icon} />
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaChartBar className={styles.icon} />
          Categories
        </NavLink>

        {/* Daha çox admin səhifəsi əlavə et: payments, comments, notifications və s. */}

        <button onClick={handleLogout} className={styles.logout}>
          <FaSignOutAlt className={styles.icon} />
          Çıxış
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
