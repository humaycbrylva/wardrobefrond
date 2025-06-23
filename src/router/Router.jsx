import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import EditProfil from '../pages/editprofil/EditProfil'
import PrivateRoute from '../components/PrivateRouter'
import OtpVerify from '../pages/otpverify/OtpVerify'
import ChangePassword from '../pages/changepassword/ChangePassword'
import ForgotPassword from '../pages/forgetpassword/ForgetPassword'
import ResetPassword from '../pages/resetpassword/ResetPassword'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Register />} />
          <Route path='/verify' element={<OtpVerify />} />

          {/* Qorunan səhifələr */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfil />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        < Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
