const Freelancer = require("../models/freelancermodel");
const Client = require("../models/clientmodel");

const checkDuplicate = async (req, res, next) => {
    console.log("I am in the check 2 function",req.body.Email);

    try {

        const freelancerUser = await Freelancer.findOne({
            where: {
                Email: req.body.Email,
                Isverified:true
            }
        });

        const clientUser = await Client.findOne({
            where: {
                Email: req.body.Email,
                Isverified:true

            }
        });
        console.log("client response:",clientUser)

       
        console.log("Freelancer response:",freelancerUser)


        if (!clientUser && !freelancerUser) {
           return  res.status(400).send({ message: "User Found" });

            next();
        }
        console.log("Going outside  check 2 function");

        if(clientUser){return res.status(200).send({ message: "User Found" ,userType:"client" });}
        if(freelancerUser){return res.status(200).send({ message: "User Found" ,userType:"freelancer" });}



        // User exists in both tables, proceed with the request
       

    } catch (error) {
        console.error("Error checking for duplicate user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = checkDuplicate;
