import React from "react";
import { Link } from "react-router-dom";
import bgimg from "../img/Backgorundimg.png";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      className="h-[600px] bg-no-repeat bg-cover bg-center py-20 text-blue-500 relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="container mx-auto flex justify-start h-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center max-w-lg"
        >
          <div className="font-bold flex items-center uppercase text-blue-500 mb-4">
            <div className="w-10 h-[2px] mr-3 bg-cyan-700 text-blue-500"></div>
            Explore Software Products
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] mb-4 font-bold text-blue-500">
            Unlock Your Potential With
            <span className="font-light md:pl-36"> Quality Software Products</span>
            
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
