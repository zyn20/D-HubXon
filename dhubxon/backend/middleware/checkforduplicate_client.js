const Client = require("../models/clientmodel");  

const checkDuplicate = (req, res, next) => {
  Client.findOne({
      where: {
          Name: req.body.email
      }
    }).then(rs => {
      if (rs) {
        res.status(400).send({message: "Failed email is already  exist"});
        return;
      }
      Client.findOne({
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