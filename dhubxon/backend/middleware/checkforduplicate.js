const Freelancer = require("../models/freelancermodel");  
const Client = require("../models/clientmodel");  


const checkDuplicate = (req, res, next) => {
  console.log("i am in check function");
    Client.findOne({
      where: {
        Email: req.body.Email,
      }
    }).then(rs => {
      if (rs) {
        res.status(409).send({message: "Failed Email is already  exist"});
        return;
      }
      Freelancer.findOne({
        where: {
          Email: req.body.Email
        }
      }).then(rs => {
        if (rs) {
          res.status(409).send({message: "Failed Email is already exist"});
          return;
        }
        console.log("Going Out through  check function");

        next();
      });
    });
  };


  module.exports = checkDuplicate