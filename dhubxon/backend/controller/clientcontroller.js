const Client = require("../models/clientmodel");
const sequelize = require("../config");
const crypto = require('crypto');
const { sendVerificationEmail } = require('./nodemailer/email');
const { Console } = require("console");



////---------------------ADD----------------
var old_data={};
let temporaryUsersrecord = {};
var user_={};
const signUp = async (req, res) => {
    try {
      

        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
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


        res.send('User verified and registered successfully');
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

      const data = await Client.findOne({
        where: {
          Password: req.body.pass,
          Email: req.body.email,
        },
      });

      if (!data) {
        console.error("Failed to sign in: User not found");
        return res.status(404).send("Login failed");
      }
  
      console.log(data);
      // const token = jwtToken.sign({ Role : "user"}, 'dfghjk')
      return res.status(200).send("Data found");
  
    } catch (error) {
      console.error("Failed to sign in:", error);
      return res.status(500).send(error.message);
    }
  };
  
  



  module.exports = {
    signIn,
    signUp,
    verify,
  }