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
import ChatPage from '../pages/chatpage/ChatPage'
import Closet from '../pages/closet/Closet'
import adminRoutes from './adminRoutes' // ✅ Admin routelar əlavə edildi
import Planner from '../pages/planner/Planner'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/closet' element={<Closet />} />
          <Route path='/planner' element={<Planner/>}/>
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />

        {/* ✅ Admin səhifələr üçün routelar */}
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default Router

