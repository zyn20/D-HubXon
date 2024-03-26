const Freelancer = require("../models/freelancermodel");
const Proposals = require("../models/proposals");
const { Sequelize } = require('sequelize');

const FreelancerProfile = require("../models/freelancerprofile");
const Post = require("../models/post");
const Comment = require("../models/comment");
const CommentReply = require("../models/commentreply");
const Subscription = require("../models/subcriptions");
const ClaimSubscription = require("../models/ClaimSubscription");

const Project = require("../models/project");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./nodemailer/email");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");

const sequelize = require("../config");
var user_ = {};
var P_email = "";
const SECRETKEY = "NATIONAL UNIVERSITY";
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dig2awru0', 
  api_key: '654569747515356', 
  api_secret: 'G-kITNA64mEFVpl-kTM_tgOXs1s' 
});

// Encryption function
function encrypt(text, secretKey) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function
function decrypt(encryptedText, secretKey) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

const signIn = async (req, res) => {
  const { email, pass } = req.body;

  try {
    // Ensure that required parameters are provided
    if (!email || !pass) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Sync with the database
    await sequelize.sync();
    const EncryptedPassword = encrypt(pass, SECRETKEY);

    // Find a Freelancer by email and password
    const freelancer = await Freelancer.findOne({
      where: {
        Password: EncryptedPassword,
        Email: email,
        Isverified: true,
      },
    });

    if (!freelancer) {
      console.error("Failed to sign in: Freelancer not found");
      return res.status(404).json({ error: "Login failed" });
    }

    console.log("Freelancer sign-in API");
    console.log(freelancer);
    user_ = freelancer;

    // Create a payload with additional data
    const payload = {
      role: "freelancer",
      freelancerData: {
        id: freelancer.id,
        name: freelancer.Name,
        email: freelancer.Email,
        // Add any other freelancer data you want to include
      },
    };

    // Sign the JWT with the payload
    const token = jwt.sign(payload, "NATIONAL UNIVERSITY", { expiresIn: "1h" });

    // Send the token and additional data in the response
    res.status(200).json({
      token,
      freelancerData: payload.freelancerData,
      message: "Sign in successful",
    });
  } catch (error) {
    console.error("Error in Sign in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  try {
    const verificationCode = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase();
    console.log(verificationCode);
    console.log("Email is:", req.body.Email);

    const { valid, reason, validators } = await isEmailValid(req.body.Email);
    console.log("Reason is:",reason);
    if (!valid) {
      return res.status(401).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason,
      });
    }


    await sendVerificationEmail(req.body.Email, verificationCode);
    const EncryptedPassword = encrypt(req.body.Pass, SECRETKEY);
    const TemporaryRecord = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: EncryptedPassword,
      OTP: verificationCode,
      Isverified: false,
    };
    const newUser = await Freelancer.create({
      ...TemporaryRecord,
    });

    console.log(user_);
    res.send("verification code sent");
  } catch (error) {
    console.error("can not added user: ", error);
    res.status(500).send(error.message);
  }
};

const Re_send_OTP = async (req, res) => {
  try {
    const verificationCode = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase();
    console.log("New Verification Code:", verificationCode);

    const email = req.body.Email;
    console.log("Email to resend OTP:", email);

    await sendVerificationEmail(email, verificationCode);

    const FreelancerData = await Freelancer.findOne({
      where: {
        Email: req.body.Email,
      },
    });

    await FreelancerData.update({ OTP: verificationCode });

    // Optionally, you may want to return a success message or handle the response as needed.
    return res.status(200).send("Email Sent Successfully");
  } catch (error) {
    console.error("Error in resending OTP:", error);
    return res.status(500).send("Error While Sending Email");
  }
};

const verify = async (req, res) => {
  try {
    const Email = req.body.Email;
    const verificationCode = req.body.verificationCode;
    console.log("Verification code:", verificationCode);
    console.log("Email is:", Email);

    const FreelancerData = await Freelancer.findOne({
      where: {
        Email: Email,
      },
    });
    console.log("Verification code By User:", verificationCode);
    console.log("Verification code By Database:", FreelancerData.OTP);

    if (
      !FreelancerData ||
      FreelancerData.OTP === "0" ||
      verificationCode !== FreelancerData.OTP
    ) {
      return res
        .status(400)
        .send("Invalid verification code or user not found");
    }

    // Update the isverified field
    await FreelancerData.update({ Isverified: true, OTP: "0" });

    res.status(200).send("User verified and registered successfully");
  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send(error.message);
  }
};

const forgetpassword = async (req, res) => {
  try {
    const verificationCode = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase();

    const freelancerData = await Freelancer.findOne({
      where: {
        Email: req.body.email,
      },
    });

    await freelancerData.update({ OTP: verificationCode });

    await sendVerificationEmail(req.body.email, verificationCode);

    res.status(200).send("Forget password process completed successfully");
  } catch (error) {
    console.error("Error in forget password process: ", error);
    res.status(500).send("Error while processing forget password request");
  }
};

const verifypassword = async (req, res) => {
  try {
    const { code, Email } = req.body;
    console.log("Verification Code from User:", code);

    const FreelancerData = await Freelancer.findOne({
      where: {
        Email: Email,
      },
    });

    console.log("Verification Code from Database:", FreelancerData.OTP);

    if (
      !FreelancerData ||
      code !== FreelancerData.OTP ||
      FreelancerData.OTP === "0"
    ) {
      return res
        .status(400)
        .send("Invalid verification code or user not found");
    }

    await FreelancerData.update({ OTP: "0" });
    // Create a payload with additional data
    const role = "All";
    const token = jwt.sign({ role }, "NATIONAL UNIVERSITY", {
      expiresIn: "1h",
    });

    // Send the token in the response
    return res
      .status(200)
      .json({ message: "Verification Code matched", token });
  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send("Error while verifying the verification code");
  }
};

const update_password = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const newEncyptedPassword = encrypt(newPassword, SECRETKEY);
    console.log("New Encrypted Password:", newEncyptedPassword);
    const oldData = await Freelancer.findOne({
      where: {
        Email: req.body.email,
      },
    });

    console.log("Old Data:", oldData);

    await oldData.update({ Password: newEncyptedPassword });
    // Log the new data

    console.log("Password Changed");
    res.status(200).send("Password Changed");
  } catch (error) {
    console.error("Error in updatePassword:", error);
    res.status(500).send(error.message);
  }
};

const Allproject = async (req, res) => {
  try {
    // Retrieve all projects
    const allProjects = await Project.findAll();

    // Log the retrieved projects (optional)
    console.log(allProjects);

    // Send the retrieved projects as the response
    res.status(200).json(allProjects);
  } catch (error) {
    console.error("Error in Allproject: ", error);
    res.status(500).send(error.message);
  }
};

const setProfile = async (req, res) => {
  // console.log("Profile URL:",req.body.imageurl);
  try {
    const Email = req.body.Email; // Assuming P_email is a constant
    console.log(P_email);
    const data = {
      city: req.body.city,
      country: req.body.country,
      headline: req.body.headline,
      headlineDescription: req.body.headlineDescription,
      portfolioDescription: req.body.portfolioDescription,
      skills: req.body.skills,
      languages: req.body.languages,
      education: req.body.education,
      certifications: req.body.certifications,
      employmentHistory: req.body.employmentHistory,
      otherExperiences: req.body.otherExperiences,
      KEYWORDS: req.body.KEYWORDS,
      email: Email,
      ProfileURL:req.body.imageUrl,
      // ProfileURL:req.body.imageurl
    };

    // Check if a user with the given email already exists
    const existingUser = await FreelancerProfile.findOne({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      // If the user does not exist, create a new profile
      await FreelancerProfile.create(data);
    } else {
      // If the user already exists, update the existing record with new data
      await FreelancerProfile.update(data, {
        where: {
          email: data.email,
        },
      });
    }

    // Handle success, send a response, or perform other actions if needed
    res.status(200).json({ message: "Profile set successfully" });
  } catch (error) {
    // Handle errors, send an error response, or log the error
    console.error("Error setting profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchprofiledata = async (req, res) => {
  const data = {
    city: "",
    country: "",
    headline: "",
    headlineDescription: "",
    portfolioDescription: "",
    skills: "",
    languages: "",
    education: "",
    certifications: "",
    employmentHistory: "",
    otherExperiences: "",
  };
  console.log(req.body);
  console.log("Email in Profile Fetch data API:", req.body.Email);

  try {
    const existingUser = await FreelancerProfile.findOne({
      where: {
        //   email: user_.Email,
        email: req.query.Email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      res.send(existingUser);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const BESTMATCH = async (req, res) => {
  try {
    const existingUser = await FreelancerProfile.findOne({
      where: {
        email: req.query.Email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userKeywords = existingUser.KEYWORDS.split(" ");
    console.log("USERKEYWORDS:", userKeywords);

    const allProjects = await Project.findAll();

    const matchedProjects = allProjects.filter((project) => {
      const projectKeywords = project.KEYWORDS.split(" ");

      const intersection = userKeywords.some((keyword) =>
        projectKeywords.includes(keyword)
      );

      return intersection;
    });

    // Log the retrieved projects (optional)
    console.log("Best Matches Projects are:", matchedProjects);

    // Send the retrieved projects as the response
    res.status(200).json(matchedProjects);
  } catch (error) {
    console.error("Error in BESTMATCH: ", error);
    res.status(500).send(error.message);
  }
};

const addPost = async (req, res) => {
  try {
    const PostData = req.body;
console.log("Post Data:",PostData);
    // Assuming your FreelancerProfile model is correctly defined
    const newPost = await Post.create(PostData);

    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPost = async (req, res) => {
  
    try {
  
      const Posts = await Post.findAll();
  
      // Respond with the list of courses
      res.status(200).json(Posts.reverse());
    } catch (error) {
      // Handle errors
      console.error('Error getting courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getmyPost = async (req, res) => {
  const email=req.query.Email;
  
  try {

    const Posts = await Post.findAll({
      where: {
      EMAIL: email,
      },
    });

    // Respond with the list of courses
    res.status(200).json(Posts.reverse());
  } catch (error) {
    // Handle errors
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DELETEPOST = async (req, res) => {
  const { id } = req.body;
  
  try {
    // Delete post
    await Post.destroy({  
      where: {
        id: id,
      },
    });

    // Delete comments associated with the post
    await Comment.destroy({  
      where: {
        POSTID: id,
      },
    });

    // Respond with success status
    res.status(200).json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error Deleting Post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const DELETECOMMENT = async (req, res) => {
  try {
    await Comment.destroy({  
      where: {
        id: req.body.id,
      },
    });

    // Optionally, update the post's comment count
    const post = await Post.findOne({ where: { id: req.body.postid } });
    if (post) {
      post.COMMENTS -= 1;
      await post.save();
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const DELETEREPLYCOMMENT = async (req, res) => {
  try {
    await Comment.destroy({  
      where: {
        id: req.body.id,
      },
    });

    // Optionally, update the post's comment count
    

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const CHANGELIKE = async (req, res) => {
  console.log("'''''''''''''''''''''''''  " ,req.body.LikesCount);
  try {
    
    const oldData = await Post.findOne({
      where: {
        id: req.body.id,
      },
    });

    console.log("Old Data:", oldData);

    await oldData.update({ LIKES: req.body.LikesCount });

    console.log("Likes Change");
    res.status(200).send("Likes Change");
  } catch (error) {
    console.error("Error in Changing Like:", error);
    res.status(500).send(error.message);
  }
};

const ADD_POST_COMMENT = async (req, res) => {
  try {
    const CommentData = req.body;
console.log("Post Data:",CommentData);
    // Assuming your FreelancerProfile model is correctly defined
    const newComment = await Comment.create(CommentData);
INCREMENT_POST_COMMENT(CommentData.POSTID);
    res.status(201).json({ message: "Post added successfully", Comment: newComment });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const ADD_REPLY_COMMENT = async (req, res) => {
  try {
    const CommentData = req.body;
console.log("Post Data:",CommentData);
    // Assuming your FreelancerProfile model is correctly defined
    const newComment = await CommentReply.create(CommentData);
    res.status(201).json({ message: "Comment added successfully", Comment: newComment });
  } catch (error) {
    console.error("Error adding Comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const INCREMENT_POST_COMMENT = async (postid) => {
  // console.log("'''''''''''''''''''''''''  " ,req.body.commentCount);
  try {
    
    const oldData = await Post.findOne({
      where: {
        id: postid,
      },
    });

    console.log("Old Data:", oldData.COMMENTS);

    await oldData.update({ COMMENTS: oldData.COMMENTS+1});

    console.log("COMMENTS COUNT CHANGE ");
    return oldData.COMMENTS+1;
    // res.status(200).send("COMMENTS COUNT CHANGE");
  } catch (error) {
    console.error("Error in Changing COMMENTS COUNT CHANGE:", error);
    return 0;
    // res.status(500).send(error.message);
  }
};

const fetchpostcomments = async (req, res) => {
  
  console.log(req.body);
  console.log("ID in Comment Fetch API:", req.query.POSTID);

  try {
    const AllComments = await Comment.findAll({
      where: {
        //   email: user_.Email,
        POSTID: req.query.POSTID,
      },
    });

    console.log(AllComments);
      res.send(AllComments);
    
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal Server Error");
  }
};


const fetchreplycomments = async (req, res) => {
  
  console.log(req.body);
  console.log("ID in Comment Fetch API:", req.query.COMMENTID);

  try {
    const AllComments = await CommentReply.findAll({
      where: {
        //   email: user_.Email,
        COMMENTID: req.query.COMMENTID,
      },
    });

    console.log(AllComments);
      res.send(AllComments);
    
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal Server Error");
  }
};


const fetchprofileurl = async (req, res) => {
  console.log("Email in Fetchprofileurl:", req.query.Email);
  try {
    const Email = req.query.Email;

    // Check if a user with the given email already exists
    const existingUser = await FreelancerProfile.findOne({
      where: {
        email: Email,
      },
    });
    console.log("exist user is:", existingUser);

    if (!existingUser) {
      // If the user does not exist, send a constant string e.g "xyz"
      res.status(200).json("https://res.cloudinary.com/dig2awru0/image/upload/v1708116157/WhatsApp_Image_2024-02-17_at_01.33.28_b9e28513_xtihdt.jpg");
    } else {
      // If the user exists, send the existing PROFILEURL
      console.log("exist user is:", existingUser.ProfileURL);
      res.status(200).json(existingUser.ProfileURL);
    }

  } catch (error) {
    // Handle errors, send an error response, or log the error
    console.error("Error Fetching profileURL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const SubmitProposals = async (req, res) => {
  try {
    const ProposalData = req.body;
    const newProposal = await Proposals.create(ProposalData);
    res.status(201).json({ message: "Proposal added successfully", post: newProposal });
  } catch (error) {
    console.error("Error adding Proposal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const getAllFreelancers = async (req, res) => {
//   try {
//     const freelancers = await Freelancer.findAll(); // Sequelize method to find all records
//     res.status(200).json(freelancers);
//   } catch (error) {
//     console.error("Error fetching all freelancers:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };



// const getAllFreelancers = async (req, res) => {
//   try {
//     const projects = await Project.findAll({
//       attributes: ['takenby'], // Fetch only the takenby field
//       where: {
//         takenby: {
//           [Sequelize.Op.not]: 'none' // Fetch only projects where takenby is not 'none'
//         }
//       }
//     });
// console.log(projects);
//     // Extract unique email addresses from projects
//     const takenByArray = projects.map(project => project.takenby);
//     const uniqueTakenBy = [...new Set(takenByArray)];

//     // Now you have an array of unique email addresses of freelancers who have taken a project
//     // You can further process this data as needed

//     res.status(200).json(uniqueTakenBy);
//   } catch (error) {
//     console.error("Error fetching freelancers with projects:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };



const getAllFreelancers = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        takenby: {
          [Sequelize.Op.not]: 'none'
        }
      }
    });

    // Extract unique email addresses from projects
    const takenByArray = projects.map(project => project.takenby);
    const uniqueTakenBy = [...new Set(takenByArray)];

    // Fetch complete freelancer objects based on the unique email addresses
    const freelancers = await Freelancer.findAll({
      where: {
        Email: {
          [Sequelize.Op.in]: uniqueTakenBy // Find freelancers whose email is in the uniqueTakenBy array
        }
      }
    });

    res.status(200).json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers with projects:", error);
    res.status(500).send("Internal Server Error");
  }
};



// const getAllFreelancers = async (req, res) => {
//   try {
//     const freelancers = await Freelancer.findAll({
//       include: [{
//         model: Project,
//         where: {
//           takenby: {
//             [Sequelize.Op.not]: 'none' // Filter out projects where takenby is not 'none'
//           }
//         }
//       }]
//     });
//     res.status(200).json(freelancers);
//   } catch (error) {
//     console.error("Error fetching freelancers:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };



const createSubscription = async (req, res) => {
  try {
    const { subscriptionType, tenure, deductionAmount, packageType, useremail } = req.body;

    // Check if there's already a subscription of the same type for the user
    const existingSubscription = await Subscription.findOne({
      where: {
        useremail,
        subscriptionType // Add subscriptionType to the query
      }
    });

    if (existingSubscription) {
      return res.status(409).json({ message: `User already has a ${subscriptionType} subscription.` });
    }

    // Proceed to create a new subscription if not already subscribed to this type
    const newSubscription = await Subscription.create({
      subscriptionType,
      subscribed: true, // Assuming a new subscription means they are subscribed
      tenure,
      deductionAmount,
      packageType,
      useremail
    });

    res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Unable to create subscription' });
  }
};








// Existing getSubscriptionStatus function
const getSubscriptionStatus = async (req, res) => {
  try {
    const useremail = req.query.useremail;

    if (!useremail) {
      return res.status(400).json({ error: 'User email is required' });
    }

    // Fetch all subscriptions for the user, instead of just one
    const subscriptions = await Subscription.findAll({ where: { useremail } });

    if (subscriptions.length === 0) {
      return res.status(404).json({ message: 'No subscriptions found for this user' });
    }

    // Map the subscriptions to a response format that lists all subscription details
    const subscriptionStatuses = subscriptions.map(subscription => ({
      subscriptionType: subscription.subscriptionType,
      subscribed: subscription.subscribed,
      tenure: subscription.tenure,
      deductionAmount: subscription.deductionAmount,
      packageType: subscription.packageType
    }));

    res.status(200).json(subscriptionStatuses);
  } catch (error) {
    console.error('Error fetching subscription statuses:', error);
    res.status(500).json({ error: 'Unable to fetch subscription statuses' });
  }
};


// Function to handle unsubscribe requests
const unsubscribe = async (req, res) => {
  try {
    const { useremail, subscriptionType } = req.body; // Include subscriptionType in the request body

    if (!useremail || !subscriptionType) {
      return res.status(400).json({ error: 'User email and subscription type are required for unsubscribe action.' });
    }

    // Attempt to find the subscription associated with the user and type
    const subscription = await Subscription.findOne({ where: { useremail, subscriptionType } });

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found for this user with the specified type.' });
    }

    // Check if the user is already unsubscribed
    if (!subscription.subscribed) {
      return res.status(400).json({ message: 'User is already unsubscribed from the specified subscription type.' });
    }

    // Update the subscription to indicate the user is no longer subscribed
    await subscription.update({ subscribed: false });

    res.status(200).json({ message: `Successfully unsubscribed from ${subscriptionType}.` });
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    res.status(500).json({ error: 'Unable to process unsubscribe request.' });
  }
};

const createClaimSubscription = async (req, res) => {
  try {
    const ClaimData = req.body;
    const newClaimData = await ClaimSubscription.create(ClaimData);
    res.status(201).json({ message: "Data added successfully", data: newClaimData });
  } catch (error) {
    console.error("Error adding Claim Subscription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = {
  signIn,
  signUp,
  verify,
  forgetpassword,
  verifypassword,
  update_password,
  Allproject,
  setProfile,
  fetchprofiledata,
  Re_send_OTP,
  BESTMATCH,
  addPost,
  getAllPost,
  CHANGELIKE,
  ADD_POST_COMMENT,
  fetchpostcomments,
  INCREMENT_POST_COMMENT,
  fetchprofileurl,
  getmyPost,
  DELETEPOST,
  getAllFreelancers,
  createSubscription,
  getSubscriptionStatus,
  unsubscribe,
  SubmitProposals,
  DELETECOMMENT,
  ADD_REPLY_COMMENT,
  fetchreplycomments,
  DELETEREPLYCOMMENT,
  getAllFreelancers,
  createSubscription,
  getSubscriptionStatus,
  unsubscribe,
  createClaimSubscription,
};
