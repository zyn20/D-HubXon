import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HomeIcon, CloudIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DefaultSidebar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const handleUploadPost = () => {
        navigate("/freelancer/addpost");
    };

    const handleMyPosts = () => {
        navigate("/freelancer/community/myposts");
    };

    const handleHome = () => {
        navigate("/freelancer/community");
    };

    return (
        <Card className="h-[calc(100vh-2rem)] w-[15vw] p-4 shadow-xl shadow-blue-gray-900/5 relative">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    
                </Typography>
            </div>
            <List>
                <div className="mt-[5vw] mr-[2vm]">
                    <ListItem>
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <button onClick={handleHome}>HOME</button>
                    </ListItem>
                </div>
                <div className="mt-[1vw]">
                    <ListItem>
                        <ListItemPrefix>
                            <CloudIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <button onClick={handleMyPosts}>MY POSTS</button>
                    </ListItem>
                </div>
                <div className="mt-[1vw]">
                    <ListItem>
                        <ListItemPrefix>
                            <UserPlusIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <button onClick={handleUploadPost}> UPLOAD </button>
                    </ListItem>
                </div>
            </List>
            <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-200 via-transparent to-transparent w-2"></div>
        </Card>
    );
};

export default DefaultSidebar;
