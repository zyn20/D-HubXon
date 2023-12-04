import CourseHome from "../E-Commerce/pages/Home";
import Sidebar from "../E-Commerce/components/Sidebar";
import Header from "../E-Commerce/components/Header";
import Footer from "../E-Commerce/components/Footer";
import React from 'react';

const CourseMainPage = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <CourseHome/>
      <Sidebar />
      <Footer />
  </div>
  )
}

export default CourseMainPage;