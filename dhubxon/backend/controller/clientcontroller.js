const Client = require("../models/clientmodel");
const ClientProfile = require("../models/clientprofile");
const Project = require("../models/project");
const sequelize = require("../config");
const crypto = require("crypto");
const { sendVerificationEmail } = require("./nodemailer/email");
const { Console } = require("console");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");


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
      projectowner:req.body.projectowner
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
    const clients = await Client.findAll(); // Sequelize method to find all records
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching all clients:", error);
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
  Postproject,
  setProfile,
  fetchprofiledata,
  Re_send_OTP,
  getAllClients,
};
