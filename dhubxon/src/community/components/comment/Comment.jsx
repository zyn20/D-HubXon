
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./comment.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Comments = ({
  postid,
  IncrementCommentcount,
  url,
  deletecomment,
  setCommentOpen,
}) => {
  const [comments, setComments] = useState([]);
  const [REPLYCOMMENTS, setREPLYCOMMENTS] = useState([]);
  const [currentCommentId,setCurrentCommentId]=useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [viewreply, setviewreply] = useState(false);
  const [Replycomment, setReplycomment] = useState("");
  const [profileURLs, setProfileURLs] = useState({});
  const [ReplyProfileURLs, setReplyProfileURLs] = useState({});
  const [MainprofileURL, MainsetProfileURL] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchReplyComment = async (commentid) => {
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:5000/freelancer/fetchreplycomments",
  //       {
  //         params: {
  //           COMMENTID: commentid,
  //         },
  //       }
  //     );

  //     const fetchedData = response.data;
  //     setREPLYCOMMENTS(fetchedData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const Email = decodedToken.freelancerData.email;
    setLoginEmail(Email);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchprofileurl",
          { params: { Email: Email } }
        );
        MainsetProfileURL(response.data);
      } catch (error) {
        console.error("Error fetching profile URL:", error);
      }
    };

    fetchData();
  }, []);


  const fetchReplyProfileURLs = async () => {
    const urls = {};
    for (const REPLYCOMMENT of REPLYCOMMENTS) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchprofileurl",
          {
            params: {
              Email: REPLYCOMMENT.EMAIL,
            },
          }
        );
        urls[REPLYCOMMENT.EMAIL] = response.data;
      } catch (error) {
        console.error("Error fetching profile URL:", error);
        urls[REPLYCOMMENT.EMAIL] = "";
      }
    }
    setReplyProfileURLs(urls);
    console.log(" Replies Profile URl:",ReplyProfileURLs);
  };

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
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.id !== id)
            );
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




  const handledeleteReplycomment = async (id) => {
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
            "http://127.0.0.1:5000/freelancer/deleteReplycomment",
            { id, postid }
          );
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setREPLYCOMMENTS((prevComments) =>
              prevComments.filter((comment) => comment.id !== id)
            );
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



  const handleReplyComment = async (Maincomment) => {
    

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const newCommentReply = {
        NAME: decodedToken.freelancerData.name,
        TIME: getCurrentDateTimeString(),
        CONTENT: Replycomment,
        COMMENTID: Maincomment.id,
        EMAIL: decodedToken.freelancerData.email,
      };


      const response = await axios.post(
        "http://127.0.0.1:5000/freelancer/ADD_REPLY_COMMENT",
        newCommentReply
      );

      Swal.fire({
        title: "Success!",
        text: "Your Comment Successfully Sent.",
        icon: "success",
      });
      setReplycomment("");

      // Handle success if needed
    } catch (error) {
      console.error("Error adding reply comment:", error);
      Swal.fire({
        title: "Error!",
        text: "An error While Sending Comment.",
        icon: "error",
      });    }
  };

  

  const handleReply = (comment) => {
    setReplyTexts((prevReplyTexts) => ({
      ...prevReplyTexts,
      [comment.id]: prevReplyTexts[comment.id] ? "" : `@reply ${comment.NAME}`,
    }));
    setviewreply(false);
  };
  


  

  const handleViewReply = async (comment) => {
    try {
      if (viewreply && comment.id === currentCommentId) {
        setviewreply(false);
      } else {
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchreplycomments",
          {
            params: {
              COMMENTID: comment.id,
            },
          }
        );
  
        const fetchedData = response.data;
        setREPLYCOMMENTS(fetchedData);
  
        // Set the current comment ID and toggle the view state for replies
        setCurrentCommentId(comment.id);
        setviewreply(true);
        fetchReplyProfileURLs();

      }
    } catch (error) {
      console.error("Error fetching reply comments:", error);
    }
  };
  


  
  const PostComment = async (values, actions, commentId) => {
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
        <div key={index} className=" mb-5">
          <div className="comment ">
            <img src={profileURLs[comment.EMAIL]} alt="" />
            <div className="info">
              <span>{comment.NAME}</span>
              <p>{comment.CONTENT}</p>
              <div className="flex gap-2">
              <div
                onClick={() => handleViewReply(comment)}
                className=" font-semibold cursor-pointer text-blue-400 hover:text-blue-600"
              >
                View Replies
              </div>
              <div
                onClick={() => handleReply(comment)}
                className=" font-semibold cursor-pointer  text-blue-400  hover:text-blue-600"
              >
                Reply?
              </div>
              </div>
            </div>
            <span className="date">{comment.TIME}</span>
            {comment.EMAIL === loginEmail && (
              <div className="mt-5 cursor-pointer">
                <DeleteIcon onClick={() => handledeletecomment(comment.id)} />
              </div>
            )}
          </div>

{/* ------------------------------------------ */}

{/* ----------------------------------------------- */}

          {replyTexts[comment.id] && (
            <div className="flex ml-[4vw]">
              <div>
                <TextField
                  id="standard-basic"
                  label={replyTexts[comment.id]}
                  variant="standard"
                  onChange={(e) => {
                    setReplycomment(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => handleReplyComment(comment)}
                type="button"
                className=" mt-[0.5vw] ml-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Reply
              </button>
            </div>
          )}

{viewreply && comment.id === currentCommentId &&
  REPLYCOMMENTS.map((reply, index) => (
    <div key={index} className="  rounded-md ml-7">
      <div className="flex gap-2 items-center">
        <img src={ReplyProfileURLs[reply.EMAIL]} className="object-cover w-6 h-6 rounded-full border-2 border-emerald-400 shadow-emerald-400" />
        <div className="pt-2 w-[15vw]"> 
          <h3 className="font-bold">{reply.NAME}</h3>
          <p className="text-gray-600 ml-1 mb-2">{reply.CONTENT}</p>
        </div>
      <span className=" text-xs ml-[18vw]  text-gray-500 mt-5">{reply.TIME}</span>
        {reply.EMAIL === loginEmail && (
              <div className="mt-5 ml-[0vw] cursor-pointer">
                <DeleteIcon  onClick={() => handledeleteReplycomment(reply.id)} />
              </div>
            )}
      </div>
    </div>
  ))}

        </div>
      ))}
    </div>
  );
};

export default Comments;
