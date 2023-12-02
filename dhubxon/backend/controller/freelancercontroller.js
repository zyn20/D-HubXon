const Freelancer = require("../models/freelancermodel");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');


const sequelize = require("../config");
let temporaryAdminrecord = {};
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

    console.log(data);
   
    res.status(200).send("Sign in");

  } catch (error) {
    console.error("Failed to sign in:", error);
    res.status(500).send(error.message);
  }
};



const signUp = async (req, res) => {
    try {
      

        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        console.log(verificationCode);
        
        await sendVerificationEmail(req.body.email, verificationCode);
temporaryAdminrecord={
    code:verificationCode,
    email:req.body.email
}

user_={
    AdminID: req.body.id,
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.pass
}


console.log(user_);


    } catch (error) {
        console.error("can not added Freelancer: ", error);
        res.status(500).send(error.message);
    }
};

const verify= async (req, res) => {
    try {

        const  verificationCode  = req.body.code;
        console.log(verificationCode);

        if (verificationCode!=temporaryAdminrecord.code) {
            return res.status(400).send('Invalid verification code');
        }
else{
        const newUser = await Freelancer.create({
            ...user_
        });
    }


        res.send('Freelancer verified and registered successfully');
    } catch (error) {
        console.error("Error in verify Freelancer: ", error);
        res.status(500).send(error.message);
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
            
            const oldData = await Freelancer.findOne({
                where: {
                    Email: temporaryUsersrecord.email, 
                },
            });
    
       
            console.log("Old Data:", oldData);
    
            
            const newData = {
                AdminID: oldData.AdminID,
                Name: oldData.Name,
                Email: oldData.Email,
                Password: req.body.password, 
            };
    
         
            console.log("New Data:", newData);
    
            
            await Freelancer.update(newData, {
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
    



module.exports = {signIn,
  signUp,
  verify,
  forgetpassword,
  verifypassword,
  update_password
};
