import ProductDetails from "../E-Commerce/pages/ProductDetails";
import Sidebar from "../E-Commerce/components/Sidebar";
import Header from "../E-Commerce/components/Header";
import Footer from "../E-Commerce/components/Footer";
import React from 'react';
const CourseDetails = () => {
  return (
     <div className="overflow-hidden">
      <Header />
       <ProductDetails/>
      <Sidebar />
      <Footer />
  </div>
  )
}
export default CourseDetails;