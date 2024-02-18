import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Freelancer/Footer'

const Layout = () => {
  return (
    <>

    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout;
