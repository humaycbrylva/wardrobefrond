import React, { useEffect } from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router';
import Footer from './footer/Footer';
import { fetchMe } from '../../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (!user && token) {
    dispatch(fetchMe());
  }
}, [user, dispatch]);


  if (loading) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
