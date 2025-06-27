import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../pages/admin/AdminSidebar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;


