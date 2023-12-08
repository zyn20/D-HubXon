import React, { useState, useEffect } from "react";
import Imgcrm from "../../assets/Hero_section_img.gif";
import logo1 from "../../assets/BinanceLogo.png";
import logo2 from "../../assets/googleLogo.png";
import logo3 from "../../assets/intelLogo.png";

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isImageVisible = windowWidth >= 992; // Adjust the breakpoint as needed

  return (
    <>
      <div className="flex pt-12 px-6 md:px-20 items-center justify-center bg-hero overflow-hidden">
        <div className="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
          <div className="w-full md:w-1/2 lg:pr-32">
            <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">
             Explore, Connect, Excel in Every Endeavor!
            </h2>
            <h3 className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
            Elevate your projects with Dhubxzone—where freelancers offer services, products, and courses,
             forging a decentralized hub for limitless possibilities
            </h3>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
             <a href="/login">
              <button className="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-blue-500 text-white border-2 border-blue-500">
                Get started
              </button>
              </a>
             
            </div>
   {/* New div for Trusted by section */}
   <div className="mt-12 text-center md:text-left">
   <h2 className="text-3xl font-semibold text-blue-900">
     Trusted by
   </h2>
   <div className="flex flex-row items-center mt-4 justify-center md:justify-start">
     {/* Logo images go here */}
     <img
       src={logo1}
       alt="Logo 1"
       className="h-12 mb-2"
     />
     <img
      src={logo2}
       alt="Logo 2"
       className="h-12 mb-2 mx-3"
     />
     <img
       src={logo3}
       alt="Logo 3"
       className="h-12 mb-2"
     />
   </div>
 </div>

          </div>
          {isImageVisible && (
            <div className="hidden lg:flex w-full md:w-1/2 justify-center md:justify-end">
              <img
                src={Imgcrm}
                alt="Girl"
                
                style={{ width: "80%", height: "80%" }}
              />
            </div>
          )}
         


        </div>
      </div>
    </>
  );
};

export default HeroSection;
