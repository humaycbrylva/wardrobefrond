import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../components/layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import PrivateRoute from '../components/PrivateRouter'

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Register/>}/>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default Router