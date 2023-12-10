const Freelancer = require("../models/freelancermodel");
const FreelancerProfile = require("../models/freelancerprofile");
const Project = require("../models/project");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./nodemailer/email");
const jwt = require("jsonwebtoken");

const sequelize = require("../config");
const { freemem } = require("os");
let temporaryRecord = {};
var user_ = {};
var P_email = "";
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




const signIn = async (req, res) => {
  const { email, pass } = req.body;

  try {
    // Ensure that required parameters are provided
    if (!email || !pass) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Sync with the database
    await sequelize.sync();
    const EncryptedPassword=encrypt(pass,SECRETKEY);

    // Find a Freelancer by email and password
    const freelancer = await Freelancer.findOne({
      where: {
        Password: EncryptedPassword,
        Email: email,
        Isverified:true
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
    res
      .status(200)
      .json({
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
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
    console.log(verificationCode);
    console.log("Email is:",req.body.Email)

    await sendVerificationEmail(req.body.Email, verificationCode);
const EncryptedPassword=encrypt(req.body.Pass,SECRETKEY);
    const TemporaryRecord={
      Name: req.body.Name,
      Email: req.body.Email,
      Password: EncryptedPassword,
      OTP:verificationCode,
      Isverified:false
    }
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
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
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
    const Email=req.body.Email;
    const  verificationCode  = req.body.verificationCode;
    console.log("Verification code:", verificationCode);
  console.log("Email is:",Email)

    const FreelancerData = await Freelancer.findOne({
      where: {
        Email: Email,
      },
    });
    console.log("Verification code By User:", verificationCode);
    console.log("Verification code By Database:", FreelancerData.OTP);



    if (!FreelancerData || FreelancerData.OTP==='0' || verificationCode !== FreelancerData.OTP) {
      return res.status(400).send("Invalid verification code or user not found");
    }

    // Update the isverified field
    await FreelancerData.update({ Isverified: true,OTP:'0' });

    res.status(200).send("User verified and registered successfully");
  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send(error.message);
  }
};

const forgetpassword = async (req, res) => {
  try {
    const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();

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

    if (!FreelancerData || code !== FreelancerData.OTP ||FreelancerData.OTP==='0') {
      return res.status(400).send("Invalid verification code or user not found");
    }

    await FreelancerData.update({ OTP: '0' });
    // Create a payload with additional data
    const role = "All";
    const token = jwt.sign({ role }, "NATIONAL UNIVERSITY", { expiresIn: "1h" });
    
    // Send the token in the response
    return res.status(200).json({ message: "Verification Code matched", token });
  } catch (error) {
    console.error("Error in verifyUser: ", error);
    res.status(500).send("Error while verifying the verification code");
  }
};

const update_password = async (req, res) => {
  try {
    const newPassword=req.body.password;
    const oldData = await Freelancer.findOne({
      where: {
        Email: req.body.email,
      },
    });

    console.log("Old Data:", oldData);

    await oldData.update({ Password: newPassword });
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
      email: Email,
    };

    console.log("Data is:", data);

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
  console.log("Email in Profile Fetch data API:",req.body.Email);

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
};
