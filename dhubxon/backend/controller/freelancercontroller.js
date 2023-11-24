const Freelancer = require("../models/freelancermodel");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');

// const jwtToken = require("jsonwebtoken");
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
    // const token = jwtToken.sign({ Role: "freelancer" }, "rtyui");
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



    



module.exports = {signIn,
  signUp,
  verify,
  
};
