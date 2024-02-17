
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../post/post';
import './posts.scss';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2'


const Posts = ({IDENTIFIER}) => {
  const [communityPosts, setCommunityPosts] = useState([]);


  const handleDeleteIcon = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post('http://127.0.0.1:5000/freelancer/deletepost', {  id: postId });
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
                    setCommunityPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

          } else {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the post.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error('Error Deleting Post:', error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the post.",
            icon: "error"
          });
        }
      }
    });
  }
  
  

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
        <Post post={post} IDENTIFIER={IDENTIFIER} onDelete={handleDeleteIcon} key={post.id} /> // Render each post component
      ))}
    </div>
  );
};

export default Posts;

