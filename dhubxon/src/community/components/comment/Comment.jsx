
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './comment.scss';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const Comments = ({ postid,CommentCount }) => {
  const [comments, setComments] = useState([
    // Your existing comments array
  ]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        
  const response = await axios.get('http://127.0.0.1:5000/freelancer/fetchpostcomments', {
    params: {
      POSTID: postid,
    },
  });
        
        const fetchedData = response.data; // Modify this based on the actual response structure
        setComments(fetchedData);
        console.log(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect

  }, []);

   

  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${dateString} ${timeString}`;
    return dateTimeString;
  };

  const PostComment = async (values, actions) => {
    if (!values.comment) {
      actions.setFieldError('comment', 'Please Enter comment');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
  
      const newComment = {
        NAME: decodedToken.freelancerData.name,
        PICTURE: 'x',
        TIME: getCurrentDateTimeString(),
        CONTENT: values.comment,
        POSTID: postid,
      };
  
      const response = await axios.post('http://127.0.0.1:5000/freelancer/ADD_POST_COMMENT', newComment);
      console.log('Post Comment sent successfully:', response.data);
      
      // Update state or perform any other action upon successful post
      setComments([...comments, newComment]);
      actions.resetForm();

//Increment in Post Comments

// try {
//   const response =  axios.post('http://127.0.0.1:5000/freelancer/INCREMENT_POST_COMMENT', {postid,commentCount:CommentCount+1});
// } catch (error) {
//   console.error('Error sending post data:', error);
// }



    } catch (error) {
      console.error('Error sending post data:', error);
      // Handle error gracefully, maybe display an error message to the user
    }
  };
  

  return (
    <div className="comments">
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={PostComment}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="write">
              <img src="" alt="" />
              <Field type="text" name="comment" placeholder="write a comment" />
              <button type="submit" disabled={isSubmitting}>Send</button>
            </div>
            <div> 
              <ErrorMessage name="comment" component="div" className="error" style={{ color: 'red' }}/>
          </div>
          </Form>
        )}
      </Formik>

      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          {/* <img src={comment.profilePicture} alt="" /> */}
          <div className="info">
            <span>{comment.NAME}</span>
            <p>{comment.CONTENT}</p>
          </div>
          <span className="date">{comment.TIME}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
