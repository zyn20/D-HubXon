const Client = require("../models/clientmodel");
const ClientProfile=require("../models/clientprofile");
const Project =require("../models/project");
const sequelize = require("../config");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');
const { Console } = require("console");
const jwt = require('jsonwebtoken');



var old_data={};
let temporaryUsersrecord = {};
var user_={};
const signUp = async (req, res) => {
    try {
        const verificationCode = crypto.randomBytes(2).toString('hex').toUpperCase();
        console.log(verificationCode);
        
        await sendVerificationEmail(req.body.email, verificationCode);
temporaryUsersrecord={
    code:verificationCode,
    email:req.body.email
}

user_={
    UserID: req.body.id,
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.pass
}


console.log(user_);
res.send("verification code sent");


    } catch (error) {
        console.error("can not added user: ", error);
        res.status(500).send(error.message);
    }
};

const verify = async (req, res) => {
    try {

        const  verificationCode  = req.body.code;
        console.log(verificationCode);

        if (verificationCode!=temporaryUsersrecord.code) {
            return res.status(400).send('Invalid verification code');
        }
else{

             

        const newUser = await Client.create({
            ...user_
        });
    }


        res.status(200).send('User verified and registered successfully');
    } catch (error) {
        console.error("Error in verifyUser: ", error);
        res.status(500).send(error.message);
    }
};





const signIn = async (req, res) => {
    try {
        await sequelize.sync();
        console.log(req.body.pass);
        console.log(req.body.email);

        const clientData = await Client.findOne({
            where: {
                Password: req.body.pass,
                Email: req.body.email,
            },
        });

        if (!clientData) {
            console.error("Failed to sign in: User not found");
            return res.status(404).send("Login failed");
        }

        console.log(clientData);
        user_=clientData;
        
        // Include client data in the JWT payload
        const payload = {
            role: 'client',
            clientData: {
                id: clientData.id,
                name: clientData.Name,
                email:clientData.Email
                // Add any other client data you want to include
            },
        };

        // Sign the JWT with the payload
        const token = jwt.sign(payload, 'NATIONAL UNIVERSITY', { expiresIn: '1h' });
        console.log(token);

        // Include additional client data in the response
        res.status(200).json({
            token,
            message: 'Sign in successful',
            clientData: payload.clientData,
        });

    } catch (error) {
        console.error("Failed to sign in:", error);
        return res.status(500).send(error.message);
    }
};

  
const forgetpassword=async (req,res)=>{
try{

var  verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
temporaryUsersrecord={
    code:verificationCode,
    email:req.body.email
}
console.log(verificationCode);

await sendVerificationEmail(req.body.email,verificationCode);

res.status(200).send("Forget password work correctly");
console.log("Forget password work correctly")

}
catch(error){
    console.error("can not send forget password: ", error);
    res.status(500).send(error.message);
}
}

const verifypassword = async (req, res) => {
    try {
        const verificationCode = req.body.code;
        console.log(verificationCode);

        if (verificationCode != temporaryUsersrecord.code) {
            return res.status(400).send('Invalid verification code');
        }
        else{

        // What should be done now?
       


        }
        res.send('Verification Code matched');
    } catch (error) {
        console.error("Error in verifyUser: ", error);
        res.status(500).send(error.message);
    }

};


const update_password = async (req, res) => {
    try {
       
        const oldData = await Client.findOne({
            where: {
                Email: temporaryUsersrecord.email, 
            },
        });

       
        console.log("Old Data:", oldData);

      d
        const newData = {
            UserID: oldData.UserID,
            Name: oldData.Name,
            Email: oldData.Email,
            Password: req.body.password, 
        };

        // Log the new data
        console.log("New Data:", newData);

        
        await Client.update(newData, {
            where: {
                Email: temporaryUsersrecord.email, 
            },
        });

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
      };


    
  
      const newPost = await Project.create({
        ...post,
      });
  
      console.log(post);
  
      res.status(201).send('Project posted successfully');
    } catch (error) {
      console.error('Error in Postproject: ', error);
      res.status(500).send(error.message);
    }
  };
  

  const setProfile = async (req, res) => {
    try {
        const P_email = user_.Email;  // Assuming P_email is a constant

        const data = {
            companyname: req.body.companyname,
            industry: req.body.industry,
            contactperson: req.body.contactperson,
            contactemail: req.body.contactemail,
            contactphone: req.body.contactphone,
            companydescription: req.body.companydescription,
            projectposted: req.body.projectposted,
            email: P_email
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
          email: user_.Email,
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
     Postproject,
     setProfile,
     fetchprofiledata
};