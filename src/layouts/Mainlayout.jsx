import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-16'><Outlet/></div>
        <Footer/>
    </div>
  )
}

export default Mainlayout