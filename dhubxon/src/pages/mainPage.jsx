import React from 'react';
import {Navbar} from '../components/home_page_compoents/navbar';
import HeroSection from '../components/home_page_compoents/hero_section';
import RatingCards from '../components/home_page_compoents/rating_card';
import IndexPage from '../components/home_page_compoents/banner';
import Index from '../components/home_page_compoents/ctoa';
import Footer from '../components/Freelancer/Footer';
import Navbar_MainPage from '../components/Freelancer/Navbar_MainPage'

const mainPage = () => {
  return (
    <>
     <Navbar_MainPage/>
    <HeroSection/>
    <IndexPage/>
    <RatingCards/>
    <Index/>
  
   

    
    </>
  )
}

export default mainPage