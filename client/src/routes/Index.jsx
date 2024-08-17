import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Error from '../pages/Error'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import Profile from '../pages/Profile'

const Index = () => {
  return <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='*' element={<Error/>}/>
  </Routes>
    <Footer/>

  </BrowserRouter>
}

export default Index
