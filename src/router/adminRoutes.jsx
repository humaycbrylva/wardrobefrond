import { Route, Navigate } from 'react-router-dom';
import AdminRoute from '../components/adminroutes/AdminRoutes';
import AdminLayout from '../components/layout/AdminLayout';

import AdminPanel from '../pages/admin/AdminPanel';
import Users from '../pages/admin/Users';
import Dashboard from '../pages/admin/Dashboard';
import UserLists from '../pages/admin/UserLists';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import ContactRequests from '../pages/admin/contact/ContactRequests';


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
    <Route path="products" element={<UserLists />} />
    <Route path="products/:userId" element={<Products />} />
    <Route path="/admin/categories" element={<Categories />} />
    <Route path="contact-requests" element={<ContactRequests/>} />
  </Route>
];

export default adminRoutes;
