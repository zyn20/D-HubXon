
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../post/post';
import './posts.scss';
import {jwtDecode} from 'jwt-decode';

const Posts = ({IDENTIFIER}) => {
  const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {

    // console.log("Value of FOR is:",FOR);
    const fetchData = async () => {
      try {
        if(IDENTIFIER=="all"){
          console.log("FInal Value is:all")
        const response = await axios.get('http://127.0.0.1:5000/freelancer/GETcommunity_post');
        console.log(response.data); // Log the response data
        setCommunityPosts(response.data); // Update state with fetched data
        }
        else{
        console.log("FInal Value is:ONE")
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const response = await axios.get('http://127.0.0.1:5000/freelancer/GETcommunity_mypost', { params: { Email: decodedToken.freelancerData.email } });
        console.log(response.data); // Log the response data
        setCommunityPosts(response.data); // Update state with fetched data
        }
      } catch (error) {
        console.error('Error fetching community posts:', error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [IDENTIFIER]);

  return (
    <div className="posts">
      {communityPosts.map(post => (
        <Post post={post} IDENTIFIER={IDENTIFIER} key={post.id} /> // Render each post component
      ))}
    </div>
  );
};

export default Posts;

