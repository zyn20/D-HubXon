import { useContext ,useState} from "react";
import "./comment.scss";
import {jwtDecode} from 'jwt-decode';


const Comments = () => {
  const [CommentData, setCommentData] = useState('');


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


  const PostComment=()=>{
    const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const comment = {
          NAME: decodedToken.freelancerData.name,
          PICTURE: "x",
          TIME: getCurrentDateTimeString(),
          CONTENT: CommentData,
         
      };
    console.log("I am in Post Comment:",CommentData);
  }

  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Great post! I really enjoyed reading it.",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Nice content! Looking forward to more.",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Alice Johnson",
      userId: 3,
      profilePicture:
        "https://example.com/profile-picture-3.jpg",
    },
    {
      id: 4,
      desc: "Awesome insights! Keep up the good work.",
      name: "Bob Smith",
      userId: 1, // Reusing the profile picture for user with userId 1
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      desc: "Impressive stuff! Can't wait for more updates.",
      name: "Eva Williams",
      userId: 2, // Reusing the profile picture for user with userId 2
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 6,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Charlie Brown",
      userId: 3, // Reusing the profile picture for user with userId 3
      profilePicture:
        "https://example.com/profile-picture-3.jpg",
    },
    {
      id: 7,
      desc: "Fantastic content! I learned a lot.",
      name: "Grace Taylor",
      userId: 1, // Reusing the profile picture for user with userId 1
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 8,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "David Lee",
      userId: 2, // Reusing the profile picture for user with userId 2
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 9,
      desc: "Keep it up! Your insights are valuable.",
      name: "Sophia Miller",
      userId: 3, // Reusing the profile picture for user with userId 3
      profilePicture:
        "https://example.com/profile-picture-3.jpg",
    },
    {
      id: 10,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Daniel White",
      userId: 1, // Reusing the profile picture for user with userId 1
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  
  return (
    <div className="comments">
      <div className="write" onClick={PostComment} >
        <img src="" alt="" />
        <input type="text" placeholder="write a comment" value={CommentData} onChange={(e)=>{setCommentData(e.target.value);}} />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;