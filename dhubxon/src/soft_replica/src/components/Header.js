import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo3.png";
import Logo3 from "@mui/icons-material/ShoppingCart";
import { Avatar, Popover } from "@mui/material";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/client/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="" />
          </div>
        </Link>

        {/* Cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative ml-auto"
        >
          <Badge badgeContent={itemAmount} color="error">
          <ShoppingCartOutlinedIcon
              style={{ color: "#your-cart-icon-color" }}
            />
          </Badge>
        </div>

        {/* Profile */}
        <div className="relative ml-4">
          <div onClick={handleProfileClick} className="cursor-pointer">
            <Avatar  />
          </div>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseProfile}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="p-2">
              {/* Dropdown content goes here */}
              <Link to="#" className="text-blue-500 hover:underline">
                Log out
              </Link>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
