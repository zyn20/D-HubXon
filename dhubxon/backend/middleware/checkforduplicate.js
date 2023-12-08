const Freelancer = require("../models/freelancermodel");  
const Client = require("../models/clientmodel");  


const checkDuplicate = (req, res, next) => {
  console.log("i am in check function");
    Client.findOne({
      where: {
          Name: req.body.email
      }
    }).then(rs => {
      if (rs) {
        res.status(400).send({message: "Failed Email is already  exist"});
        return;
      }
      Freelancer.findOne({
        where: {
          Email: req.body.email
        }
      }).then(rs => {
        if (rs) {
          res.status(400).send({message: "Failed Email is already exist"});
          return;
        }

        next();
      });
    });
  };


  module.exports = checkDuplicate