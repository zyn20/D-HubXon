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
     
    //   return res.status(200).send("Data found");
      return res.status(200).json({ message: "Data found", data: data });
  
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
    try {
        var post = {
            ClientID: 1,
            Title:req.body.title,
            Description: req.body.description,
            Price: req.body.price,
            Keywords: req.body.keyword
        };

        const newUser = await Post.create({
            ...post
        });

        console.log(post);

        res.status(201).send('Project posted successfully'); 
    } catch (error) {
        console.error("Error in Postproject: ", error);
        res.status(500).send(error.message);
    }
};



  module.exports = {
    signIn,
    signUp,
    verify,
    forgetpassword,
    verifypassword,
    update_password,
     Postproject
};