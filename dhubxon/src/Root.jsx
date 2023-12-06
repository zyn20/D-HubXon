import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Freelancer/Navbar'
import Footer from './components/Freelancer/Footer'

const Layout = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default Layout;
