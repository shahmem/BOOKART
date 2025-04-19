import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../CommonComponents/Signup'
import Login from '../CommonComponents/Login'
import Home from '../Pages/Home'
import Cart from '../Pages/Cart'
import BookDetails from '../Pages/BookDetails'
import Wishlist from '../Pages/Wishlist'

function Router() {
  return (
    <>
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </>
  )
}

export default Router