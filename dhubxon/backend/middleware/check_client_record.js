const Client = require("../models/clientmodel");  

const checkrecord = (req, res, next) => {
  Client.findOne({
      where: {
          Email: req.body.email
      }
    }).then(rs => {
      if (!rs) {
        res.status(400).send({message: "Failed Email does not  exist"});
        return;
      }
    

        next();
    //   });
    });
  };


  module.exports = checkrecord