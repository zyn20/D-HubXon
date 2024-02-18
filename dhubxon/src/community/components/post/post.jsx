import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comment/Comment";
import { useEffect, useState } from "react";
import axios from 'axios';


const Post = ({ post }) => {
  const [profileURL, setProfileURL] = useState("");
  var id=post.id;
  const [commentOpen, setCommentOpen] = useState(false);  
  const [liked,setliked] = useState(false);
  const [LikesCount,setLikesCount]=useState(post.LIKES);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(" Profile URL:",profileURL)
        const response = await axios.get('http://127.0.0.1:5000/freelancer/fetchprofileurl', { params: { Email: post.EMAIL } });
        setProfileURL(response.data); // Update profileURL state with the fetched data
        console.log(" Profile URL:",profileURL)
      } catch (error) {
        console.error('Error fetching profile URL:', error);
      }
    };
  
    fetchData();
  }, [post.EMAIL]);
  

const LIKED=()=>{
  if(!liked){
    console.log("Before Likes Count is:",LikesCount)

    setliked(true);
    setLikesCount(LikesCount+1);
    console.log("After Likes Count is:",LikesCount)
    try {
      const response =  axios.post('http://127.0.0.1:5000/freelancer/CHANGELIKEcommunity_post', {id,LikesCount:LikesCount+1});
  } catch (error) {
      console.error('Error sending post data:', error);
  }
  
  }
  else{setliked(false);setLikesCount(LikesCount-1);
    try {
    const response =  axios.post('http://127.0.0.1:5000/freelancer/CHANGELIKEcommunity_post', {id,LikesCount:LikesCount-1});
} catch (error) {
    console.error('Error sending post data:', error);
}}
  console.log("I am in Like Function:",post.id);
}

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profileURL} alt="" />
            <div className="details">
              <p
                // to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.NAME}</span>
              </p>
              <span className="date">{post.TIME}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.CONTENT}</p>
          {/* <img src={post.img} alt="" /> */}
        </div>
        <div className="info">
          <div className="item" onClick={LIKED}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {LikesCount}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.COMMENTS}          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments  postid={post.id} url={profileURL} CommentCount={post.COMMENTS}/>}
      </div>
    </div>
  );
};

export default Post;