const Freelancer = require("../models/freelancermodel");
const FreelancerProfile=require("../models/freelancerprofile");
const Project =require("../models/project");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');

// const x=require("")

const sequelize = require("../config");
const { freemem } = require("os");
let temporaryRecord = {};
var user_={}
var P_email="";

const signIn = async (req, res) => {
    P_email=req.body.email;
  try {
    await sequelize.sync();
    const data = await Freelancer.findOne({
      where: {
        Password: req.body.pass,
        Email: req.body.email,
      },
    });

    if (!data) {
      console.error("Failed to sign in: Freelancer not found");
      return res.status(404).send("Login failed");
    }
console.log("i am in freelancer signin APi");
    console.log(data);
   
    res.status(200).send("Sign in");

  } catch (error) {
    console.error("Error in Sign in:", error);
    res.status(500).send(error.message);
  }
};



const signUp = async (req, res) => {
    try {
      

        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        console.log(verificationCode);
        
        await sendVerificationEmail(req.body.email, verificationCode);
temporaryRecord={
    code:verificationCode,
    email:req.body.email
}

user_={

        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.pass
}


console.log(user_);
res.send("ok");

    } catch (error) {
        console.error("can not added Freelancer: ", error);
        res.status(500).send(error.message);
    }
};

const verify= async (req, res) => {
    try {
        console.log(req.body.code);
        const  verificationCode  = req.body.code;
        console.log(verificationCode);

        if (verificationCode!=temporaryRecord.code) {
            return res.status(400).send('Invalid verification code');
        }
else{
        const newUser = await Freelancer.create({
            ...user_
        });
    }


        res.status(200).send('Freelancer verified and registered successfully');
    } catch (error) {
        console.error("Error in verify Freelancer: ", error);
        res.status(500).send(error.message);
    }
};




  


const forgetpassword=async (req,res)=>{
    try{
    
    var  verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    temporaryRecord={
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
    
            if (verificationCode != temporaryRecord.code) {
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
            
            const oldData = await Freelancer.findOne({
                where: {
                    Email: temporaryRecord.email, 
                },
            });
    
       
            console.log("Old Data:", oldData);
    
            
            const newData = {
                Name: oldData.Name,
                Email: oldData.Email,
                Password: req.body.password, 
            };
    
         
            console.log("New Data:", newData);
    
            
            await Freelancer.update(newData, {
                where: {
                    Email: temporaryRecord.email, 
                },
            });
    
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
            console.error('Error in Allproject: ', error);
            res.status(500).send(error.message);
        }
    };










    //////////////////////////middleware
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //       // Specify the destination folder for uploaded files
    //       cb(null, '../portfolio');
    //     },
    //     filename: function (req, file, cb) {
    //       // Specify a unique filename for the uploaded file
    //       cb(null, P_email + '-' + file.originalname);
    //     },
    //   });
      
    //   const upload = multer({ storage: storage });





    const setProfile = async (req, res) => {
        try {
            const P_email = "alichoudhary669@gmail.com";  // Assuming P_email is a constant
    
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
                email: P_email
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
    
    

    
    



module.exports = {signIn,
  signUp,
  verify,
  forgetpassword,
  verifypassword,
  update_password,
  Allproject,
  setProfile
};
