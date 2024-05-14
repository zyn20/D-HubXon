const Client = require("../models/clientmodel");
const ClientProfile = require("../models/clientprofile");
const Proposal=require("../models/proposals")
const Project = require("../models/project");
const sequelize = require("../config");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./nodemailer/email");
const { Console } = require("console");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const DisputeRequests=require("../models/disputeRequests")
// const Sequelize = require('sequelize');
const { Sequelize } = require('sequelize');


var old_data = {};
let temporaryUsersrecord = {};
var user_ = {};                       


const SECRETKEY="NATIONAL UNIVERSITY";


// Encryption function
function encrypt(text, secretKey) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(encryptedText, secretKey) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

async function isEmailValid(email) {
  return emailValidator.validate(email);
}


const signUp = async (req, res) => {
  try {
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
    console.log(verificationCode);
    const { valid, reason, validators } = await isEmailValid(req.body.Email);
    console.log("Reason is:",reason);
    if (!valid) {
      return res.status(401).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason,
      });
    }


    await sendVerificationEmail(req.body.Email, verificationCode);
    const EncryptedPassword=encrypt(req.body.Pass,SECRETKEY);

    const TemporaryRecord={
      Name: req.body.Name,
      Email: req.body.Email,
      Password: EncryptedPassword,
      OTP:verificationCode,
      Isverified:false
    }
    const newUser = await Client.create({
      ...TemporaryRecord,
    });
   

    console.log(user_);
    res.send("verification code sent");
  } catch (error) {
    console.error("can not added user: ", error);
    res.status(500).send(error.message);
  }
};

const verify = async (req, res) => {
  try {
    const Email=req.body.Email;
    const  verificationCode  = req.body.verificationCode;
    console.log("Verification code:", verificationCode);
  console.log("Email is:",Email)

    const clientData = await Client.findOne({
      where: {
        Email: Email,
      },
    });
    console.log("Verification code By User:", verificationCode);
    console.log("Verification code By Database:", clientData.OTP);



    if (!clientData ||  clientData.OTP ==='0' || verificationCode !== clientData.OTP) {
      return res.status(400).send("Invalid verification code or user not found");
    }

    
    await clientData.update({ Isverified: true,OTP: '0' });
    


    res.status(200).send("User verified and registered successfully");
  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send(error.message);
  }
};


const Re_send_OTP = async (req, res) => {
  try {
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
    console.log("New Verification Code:", verificationCode);
    
    const email = req.body.Email;
    console.log("Email to resend OTP:", email);
    
    await sendVerificationEmail(email, verificationCode);

    const clientData = await Client.findOne({
      where: {
        Email: req.body.Email,
      },
    });

    await clientData.update({ OTP: verificationCode });

    // Optionally, you may want to return a success message or handle the response as needed.
    return res.status(200).send("Email Sent Successfully");
  } catch (error) {
    console.error("Error in resending OTP:", error);
    return res.status(500).send("Error While Sending Email");
  }
};

const signIn = async (req, res) => {
  try {
    await sequelize.sync();
    console.log(req.body.pass);
    console.log(req.body.email);
    const EncryptedPassword=encrypt(req.body.pass,SECRETKEY);


    const clientData = await Client.findOne({
      where: {
        Password: EncryptedPassword,
        Email: req.body.email,
        Isverified:true
      },
    });

    if (!clientData) {
      console.error("Failed to sign in: User not found");
      return res.status(404).send("Login failed");
    }

    console.log(clientData);
    user_ = clientData;

    // Include client data in the JWT payload
    const payload = {
      role: "client",
      clientData: {
        id: clientData.id,
        name: clientData.Name,
        email: clientData.Email,
        // Add any other client data you want to include
      },
    };

    // Sign the JWT with the payload
    const token = jwt.sign(payload, "NATIONAL UNIVERSITY", { expiresIn: "1h" });
    console.log(token);

    // Include additional client data in the response
    res.status(200).json({
      token,
      message: "Sign in successful",
      clientData: payload.clientData,
    });
  } catch (error) {
    console.error("Failed to sign in:", error);
    return res.status(500).send(error.message);
  }
};



const forgetpassword = async (req, res) => {
  try {
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();

    const clientData = await Client.findOne({
      where: {
        Email: req.body.email,
      },
    });

    await clientData.update({ OTP: verificationCode });

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

    const clientData = await Client.findOne({
      where: {
        Email: Email,
      },
    });

    console.log("Verification Code from Database:", clientData.OTP);

    if (!clientData || code !== clientData.OTP || clientData.OTP==='0') {
      return res.status(400).send("Invalid verification code or user not found");
    }
    await clientData.update({ OTP: '0' });

    const role = "All";
    const token = jwt.sign({ role }, "NATIONAL UNIVERSITY", { expiresIn: "1h" });
    
    // Send the token in the response
    return res.status(200).json({ message: "Verification Code matched", token });  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send("Error while verifying the verification code");
  }
};


const update_password = async (req, res) => {
  try {
    const newPassword=req.body.password;
    const newEncyptedPassword=encrypt(newPassword,SECRETKEY);
    const oldData = await Client.findOne({
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


const fetchprofileurl = async (req, res) => {
  console.log("Email in Fetchprofileurl:", req.query.Email);
  try {
    const Email = req.query.Email;

    // Check if a user with the given email already exists
    const existingUser = await ClientProfile.findOne({
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

const Postproject = async (req, res) => {
  console.log("------------------------------");
  console.log(req.body.title);
  try {
    const post = {
      title: req.body.title,
      description: req.body.description,
      skillRequired: req.body.skillRequired,
      projectDuration: req.body.projectDuration,
      pricingType: req.body.pricingType,
      projectDeadline: req.body.projectDeadline,
      budget: req.body.budget,
      KEYWORDS:req.body.KEYWORDS.toUpperCase(),
      projectowner:req.body.projectowner,
      BLOCKCHAININDEX:req.body.latestProjectIdint
    };

    const newPost = await Project.create({
      ...post,
    });

    console.log(post);

    res.status(201).send("Project posted successfully");
  } catch (error) {
    console.error("Error in Postproject: ", error);
    res.status(500).send(error.message);
  }
};

const setProfile = async (req, res) => {
  try {
    const Email = req.body.Email; // Assuming P_email is a constant

    const data = {
      companyname: req.body.companyname,
      industry: req.body.industry,
      contactperson: req.body.contactperson,
      contactemail: req.body.contactemail,
      contactphone: req.body.contactphone,
      companydescription: req.body.companydescription,
      projectposted: req.body.projectposted,
      ProfileURL:req.body.imageUrl,
      email: Email,
    };

    console.log("Data is:", data);

    // Check if a user with the given email already exists
    const existingUser = await ClientProfile.findOne({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      // If the user does not exist, create a new profile
      await ClientProfile.create(data);
    } else {
      // If the user already exists, update the existing record with new data
      await ClientProfile.update(data, {
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
    companyname: " ",
    industry: " ",
    contactperson: " ",
    contactemail: " ",
    contactphone: " ",
    companydescription: "",
    projectposted: " ",
  };

  try {
    const existingUser = await ClientProfile.findOne({
      where: {
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





const getAllClients = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        projectowner: {
          [Sequelize.Op.not]: 'none'
        }
      }
    });

    // Extract unique email addresses of project owners
    const projectOwnerArray = projects.map(project => project.projectowner);
    const uniqueProjectOwners = [...new Set(projectOwnerArray)];

    // Fetch complete client objects based on the unique email addresses
    const clients = await Client.findAll({
      where: {
        Email: {
          [Sequelize.Op.in]: uniqueProjectOwners
        }
      }
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients with projects:", error);
    res.status(500).send("Internal Server Error");
  }
};


const getProjectbyid = async (req, res) => {
  try {
    const existingProject = await Project.findOne({
      where: {
        id: req.query.PROJECTID,
      },
    });

    if (existingProject) {
      res.send(existingProject);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    res.status(500).send("Internal Server Error");
  }
};



const SubmitDisputeRequest = async (req, res) => {
  try {
    const ProposalData = req.body;
    const newProposal = await DisputeRequests.create(ProposalData);
    res.status(201).json({ message: "Proposal added successfully", DisputeRequests: newProposal });
  } catch (error) {
    console.error("Error adding Proposal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const deleteproposals = async (req, res) => {
  const proposalId = req.body.ProposalID;

  try {
    // Find the proposal by its ID
    const proposal = await Proposal.findByPk(proposalId);
    if (!proposal) {
      return res.status(404).send("Proposal not found");
    }

    // Get the ProjectID of the proposal
    const projectId = proposal.PROJECTID;

    // Find all proposals with the same ProjectID
    const proposals = await Proposal.findAll({
      where: {
        PROJECTID: projectId,
      },
    });

    // Filter out the proposal with the specified ProposalID
    const proposalsToDelete = proposals.filter(p => p.id !== proposalId);

    // Delete the filtered proposals
    for (const p of proposalsToDelete) {
      await p.destroy();
    }

    res.status(200).send("Proposals deleted successfully");
  } catch (error) {
    console.error("Error deleting proposals:", error);
    res.status(500).send("Internal Server Error");
  }
};


const countOngoingProjects = async (req, res) => {
  try {
    const owner = req.params.owner; // Assume owner is passed as a URL parameter
    const count = await Project.count({
      where: {
        projectowner: owner,
        status: 'Pending'
      }
    });
    res.json({ ongoingProjects: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//complete Projects
const countCompletedProjects = async (req, res) => {
  try {
    const owner = req.params.owner; 
    const count = await Project.count({
      where: {
        projectowner: owner,
        status: 'Completed'
      }
    });
    res.json({ completedProjects: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const countPendingProposals = async (req, res) => {
  try {
    const owner = req.params.owner; // Assume owner is passed as a URL parameter
    const count = await Project.count({
      where: {
        projectowner: owner,
        takenby: {
          [Sequelize.Op.ne]: 'none'
        }
      }
    });
    res.json({ pendingProposals: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};






module.exports = {
  signIn,
  signUp,
  verify,
  forgetpassword,
  verifypassword,
  update_password,
  Postproject,
  setProfile,
  fetchprofiledata,
  Re_send_OTP,
  getAllClients,
  fetchprofileurl,
  getProjectbyid,
  deleteproposals,
SubmitDisputeRequest,
countCompletedProjects,
countOngoingProjects,
countPendingProposals

};
