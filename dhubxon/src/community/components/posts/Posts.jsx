
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../post/post';
import './posts.scss';

const Posts = () => {
  const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/freelancer/GETcommunity_post');
        console.log(response.data); // Log the response data
        setCommunityPosts(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching community posts:', error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  return (
    <div className="posts">
      {communityPosts.map(post => (
        <Post post={post} key={post.id} /> // Render each post component
      ))}
    </div>
  );
};

export default Posts;

