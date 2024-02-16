import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./comment.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Comments = ({ postid, CommentCount, url }) => {
  const [comments, setComments] = useState([]);
  const [profileURLs, setProfileURLs] = useState({});
  const [MainprofileURL, MainsetProfileURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchpostcomments",
          {
            params: {
              POSTID: postid,
            },
          }
        );

        const fetchedData = response.data; // Modify this based on the actual response structure
        setComments(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
          const Email=decodedToken.freelancerData.email
    const fetchData = async () => {
      try {
        console.log(" Profile URL:",MainprofileURL)
        const response = await axios.get('http://127.0.0.1:5000/freelancer/fetchprofileurl', { params: { Email: Email } });
        MainsetProfileURL(response.data); // Update profileURL state with the fetched data
        console.log(" Profile URL:",MainprofileURL)
      } catch (error) {
        console.error('Error fetching profile URL:', error);
      }
    };
  
    fetchData();
  }, []);



  useEffect(() => {

    
    const fetchProfileURLs = async () => {
      const urls = {};
      for (const comment of comments) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:5000/freelancer/fetchprofileurl",
            {
              params: {
                Email: comment.EMAIL,
              },
            }
          );
          urls[comment.EMAIL] = response.data;
        } catch (error) {
          console.error("Error fetching profile URL:", error);
          // Handle error gracefully or set a default URL
          urls[comment.EMAIL] = ""; // Set a default URL in case of error
        }
      }
      setProfileURLs(urls);
    };

    fetchProfileURLs();
  }, [comments]);

  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${dateString} ${timeString}`;
    return dateTimeString;
  };

  const PostComment = async (values, actions) => {
    if (!values.comment) {
      actions.setFieldError("comment", "Please Enter comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const newComment = {
        NAME: decodedToken.freelancerData.name,
        PICTURE: "x",
        TIME: getCurrentDateTimeString(),
        CONTENT: values.comment,
        POSTID: postid,
        EMAIL: decodedToken.freelancerData.email,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/freelancer/ADD_POST_COMMENT",
        newComment
      );
      console.log("Post Comment sent successfully:", response.data);

      // Update state or perform any other action upon successful post
      setComments([...comments, newComment]);
      actions.resetForm();
    } catch (error) {
      console.error("Error sending post data:", error);
      // Handle error gracefully, maybe display an error message to the user
    }
  };

  return (
    <div className="comments">
      <Formik initialValues={{ comment: "" }} onSubmit={PostComment}>
        {({ isSubmitting }) => (
          <Form>
            <div className="write">
              <img src={MainprofileURL} alt="" />
              <Field type="text" name="comment" placeholder="write a comment" />
              <button type="submit" disabled={isSubmitting}>
                Send
              </button>
            </div>
            <div>
              <ErrorMessage
                name="comment"
                component="div"
                className="error"
                style={{ color: "red" }}
              />
            </div>
          </Form>
        )}
      </Formik>

      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <img src={profileURLs[comment.EMAIL]} alt="" />
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
