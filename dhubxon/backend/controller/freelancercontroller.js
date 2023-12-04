const Freelancer = require("../models/freelancermodel");
const Project =require("../models/project");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');


const sequelize = require("../config");
const { freemem } = require("os");
let temporaryRecord = {};
var user_={}


const signIn = async (req, res) => {
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
    



module.exports = {signIn,
  signUp,
  verify,
  forgetpassword,
  verifypassword,
  update_password,
  Allproject
};
