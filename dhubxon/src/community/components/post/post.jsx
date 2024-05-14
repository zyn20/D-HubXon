


import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Comments from "../comment/Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import abi from "../../../contract/ContributeProjects.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Post = ({ post, IDENTIFIER, onDelete }) => {
  var id = post.id;
  const EtherumPrice = 3932;
  const [profileURL, setProfileURL] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setliked] = useState(false);
  const [LikesCount, setLikesCount] = useState(post.LIKES);
  const [CommentCount, setCommentCount] = useState(post.COMMENTS);
  const [ContributionAmmount, setContributionAmmount] = useState(0);
  const [BLOCKCHAININDEX, setBLOCKCHAININDEX] = useState(post.BLOCKCHAININDEX);
  const [contributionEthers, setcontributionEthers] = useState("0 ethers");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const Reducecommentcount=()=>{
    setCommentCount((prevCount) => prevCount - 1)
  }

  const incrementCommentCount = () => {
    setCommentCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchprofileurl",
          { params: { Email: post.EMAIL } }
        );
        setProfileURL(response.data); // Update profileURL state with the fetched data
      } catch (error) {
        console.error("Error fetching profile URL:", error);
      }
    };

    fetchData();
  }, [post]);

  useEffect(() => {
    // console.log("Updated state:", state);
  }, [state]);

  useEffect(() => {
    const connectToBlockchain = async () => {
      const contractAddress = "0xc55b72FCF24645d3eEa45eF8D8337Ae1D1903E10";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum); // Read from the Blockchain
        const signer = provider.getSigner(); // Write to the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });

        // console.log("useeffect Contract Data is 2:", state);
      } catch (error) {
        console.log(error);
      }
    };

    connectToBlockchain();
  }, []); // No dependencies, so this effect runs only once on component mount

  const handleContributevalueChange = (e) => {
    const value = e.target.value;
    setContributionAmmount(value);
    const ethersAmount = value / EtherumPrice;
    setcontributionEthers(ethersAmount.toString());
  };

 

  const Contribute = async (BlockchainIndex) => {
    console.log("BlockchainIndex:",BlockchainIndex);
    if (ContributionAmmount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Contribution Amount",
        text: "Contribution amount must be greater than 0.",
      });
      return;
    }
    try {
      const contributionInEther = ContributionAmmount / EtherumPrice;
      // console.log("Price in Ethers:", contributionInEther);
      const amount = {
        value: ethers.utils.parseEther(contributionInEther.toString()),
      };
      const transaction = await state.contract.contribute(
        2,
        amount
      );
      await transaction.wait();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Transaction Canceled",
        text: "The transaction was canceled by the user.",
      });
    }
  };

  const LIKED = () => {
    if (!liked) {
      setliked(true);
      setLikesCount(LikesCount + 1);
      try {
        const response = axios.post(
          "http://127.0.0.1:5000/freelancer/CHANGELIKEcommunity_post",
          { id, LikesCount: LikesCount + 1 }
        );
      } catch (error) {
        console.error("Error sending post data:", error);
      }
    } else {
      setliked(false);
      setLikesCount(LikesCount - 1);
      try {
        const response = axios.post(
          "http://127.0.0.1:5000/freelancer/CHANGELIKEcommunity_post",
          { id, LikesCount: LikesCount - 1 }
        );
      } catch (error) {
        console.error("Error sending post data:", error);
      }
    }
    // console.log("I am in Like Function:", post.id);
  };

  return (
    <div className="post w-[50vw]">
      <div className="container ">
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
          {IDENTIFIER == "one" && (
            <DeleteIcon onClick={() => onDelete(post.id)} />
          )}
        </div>

        <div className="flex flex-col justify-center ">
          <p className="m-2">{post.CONTENT}</p>


          
          {post.PICTURES && (
  <div className="max-w-2xl mx-auto">
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      {post.PICTURES.map((picture, index) => (
        <div key={index} className="">
          <img src={picture} alt={`slide ${index + 1}`} style={{ maxHeight: "600px" }} />
        </div>
      ))}
    </Carousel>
  </div>
)}









        </div>

        <div className="info mt-4">
          <div className="item" onClick={LIKED}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {LikesCount}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {CommentCount}{" "}
          </div>

          {BLOCKCHAININDEX !== -1 && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "inline-block" }}>
                  <input
                    type="email"
                    id="helper-text"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter In Dollars"
                    onChange={handleContributevalueChange}
                    value={ContributionAmmount}
                  />
                </div>
                <div style={{ display: "inline-block " }}>
                  <button
                    type="button"
                    className=" mt-[0.5vw] ml-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>Contribute(post.BLOCKCHAININDEX)}
                  >
                    Pay
                  </button>
                </div>
                <div>{contributionEthers}</div>
              </div>
            </>
          )}
        </div>
        {commentOpen && (
          <Comments
            postid={post.id}
            IncrementCommentcount={incrementCommentCount}
            url={profileURL}
            CommentCount={post.COMMENTS}
            deletecomment={Reducecommentcount}
            setCommentOpen
          />
        )}
      </div>
    </div>
  );
};

export default Post;

