import React from "react";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[600px] bg-hero bg-no-repeat bg-cover bg-center py-20 text-blue-500">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase text-blue-500">
            <div className="w-10 h-[2px] mr-3 bg-cyan-700 text-blue-500"></div>Hot Trend
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1]  mb-4 text-blue-500" >Digital Excellence Unleashed<br />
          <span className="font-light md:pl-36">new collection</span></h1>
    
        </div>
      </div>
    </section>
  );
};

export default Hero;