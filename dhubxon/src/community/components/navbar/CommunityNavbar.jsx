import React from "react";
import "./communitynavbar.scss";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import {
  EmailOutlined,
  NotificationsOutlined,
  PercentOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";
import { HomeOutlined } from "@mui/icons-material";
import { GridViewOutlined } from "@mui/icons-material";
import { DarkModeOutlined } from "@mui/icons-material";
import img from "../../../assets/profile image.png";

const CommunityNavbar = () => {
  return (
    <>
      <div className="navbar">
        {/* Left Section */}
        <div className="left">
          <Link to="/community" style={{ textDecoration: "none" }}>
            <span>D-Community</span>
          </Link>
          <HomeOutlined />
          <DarkModeOutlined />
          <GridViewOutlined />

          <div className="search">
            <SearchOutlined />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
          <PersonOutline />
          <EmailIcon />
          <NotificationsOutlined />
        </div>

        {/* User Section */}
        <div className="user">
          {/* <img src={img} alt="" /> */}
          <span>Zain</span>
        </div>
      </div>
    </>
  );
};

export default CommunityNavbar;