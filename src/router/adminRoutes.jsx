import { Route, Navigate } from 'react-router-dom';
import AdminRoute from '../components/adminroutes/AdminRoutes';
import AdminLayout from '../components/layout/AdminLayout';

import AdminPanel from '../pages/admin/AdminPanel';
import Users from '../pages/admin/Users';
import Dashboard from '../pages/admin/Dashboard';

const adminRoutes = [
  <Route
    key="admin-root"
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route index element={<Navigate to="dashboard" />} /> {/* redirect to dashboard */}
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<AdminPanel />} />
  </Route>
];

export default adminRoutes;
