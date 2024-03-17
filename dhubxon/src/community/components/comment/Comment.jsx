import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./comment.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Comments = ({ postid, IncrementCommentcount, url, deletecomment ,setCommentOpen}) => {
  const [comments, setComments] = useState([]);
  const [profileURLs, setProfileURLs] = useState({});
  const [MainprofileURL, MainsetProfileURL] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const navigate = useNavigate();

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

      const fetchedData = response.data; 
      setComments(fetchedData);
      console.log("COmments are", fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    

    fetchData(); // Call the async function inside useEffect
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const Email = decodedToken.freelancerData.email;
    setloginEmail(Email);
    const fetchData = async () => {
      try {
        console.log(" Profile URL:", MainprofileURL);
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchprofileurl",
          { params: { Email: Email } }
        );
        MainsetProfileURL(response.data); // Update profileURL state with the fetched data
        console.log(" Profile URL:", MainprofileURL);
      } catch (error) {
        console.error("Error fetching profile URL:", error);
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
          urls[comment.EMAIL] = "";
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

  const handledeletecomment = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/freelancer/deletecomment",
            { id, postid }
          );
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // Delete the comment from the state
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.id !== id)
            );
            // Update the comment count
            deletecomment();
          } else {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the post.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error Deleting Post:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the post.",
            icon: "error",
          });
        }
      }
    });
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

      fetchData();
      setComments([...comments, newComment]);

      IncrementCommentcount();
      actions.resetForm();
    } catch (error) {
      console.error("Error sending post data:", error);
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

          {comment.EMAIL === loginEmail && (
            <div>
              <DeleteIcon onClick={() => handledeletecomment(comment.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
