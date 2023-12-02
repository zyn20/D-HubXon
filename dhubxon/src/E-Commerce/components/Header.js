import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";
import Profile from "../profile1.jpg";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleProfileClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
    className={`${
      isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
    } fixed w-full z-10 lg:px-8 transition-all`}
  >
    <div className="container mx-auto flex items-center justify-between h-full">
      <Link to={"/"}>
        <div className="w-[40px]">
          <img src={Logo} alt="" />
        </div>
      </Link>
  
      {/* cart */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex relative ml-auto"
      >
        <BsBag className="text-2xl" />
        <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
          {itemAmount}
        </div>
      </div>
  
      <div className="relative ml-4">
      <div onClick={handleProfileClick} className="cursor-pointer">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={Profile}
          alt=""
        />
        <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-10 right-0 bg-white shadow-md p-4 whitespace-nowrap">
          {/* Dropdown content goes here */}
          <a href="#" className="text-blue-500 hover:underline">
          Log out
        </a>
        </div>
      )}
    </div>
    </div>
  </header>    
  );
};

export default Header;










