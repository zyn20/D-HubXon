import React from "react";
import "./communitynavbar.scss";
import { Link ,useNavigate} from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";



const CommunityNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

  const handleUploadPost = () => {
    navigate("/freelancer/addpost");
    // console.log('Upload post clicked');
  };

  const handleMyPosts = () => {
    navigate("/freelancer/community/myposts");
    
  };
  const handleHome = () => {
    navigate("/freelancer/community");
    
  };
  return (
    <>
      <div className="navbar">
        {/* Left Section */}
        <div className="left">
          <Link onChange={handleHome} style={{ textDecoration: "none" }}>
            <span>D-Community</span>
          </Link>
          {/* <HomeOutlined />
          <DarkModeOutlined />
          <GridViewOutlined /> */}

          {/* <div className="search">
            <SearchOutlined />
            <input type="text" placeholder="Search" />
          </div> */}
        </div> 

        {/* Right Section */}
        <div className="right justify-center mr-9 ml-9">
        <button onClick={handleHome} className="upload-button">
            Home
          </button>
          <button onClick={handleMyPosts} className="upload-button">
            My Posts
          </button>
          <button onClick={handleUploadPost} className="upload-button">
            Upload Post
          </button>
          {/* <PersonOutline />
          <EmailIcon />
          <NotificationsOutlined /> */}
        </div>

        {/* User Section */}
        <div className="user">
          {/* <img src={img} alt="" /> */}
          <span>{decodedToken.freelancerData.name}</span>
        </div>
      </div>
    </>
  );
};

export default CommunityNavbar;
