const Freelancer = require("../models/freelancermodel");
const Client = require("../models/clientmodel");

const checkDuplicate = async (req, res, next) => {
    console.log("I am in the check 2 function");

    try {

        const freelancerUser = await Freelancer.findOne({
            where: {
                Email: req.body.email
            }
        });

        const clientUser = await Client.findOne({
            where: {
                Email: req.body.email
            }
        });
        console.log("client response:",clientUser)

        // const freelancerUser = await Freelancer.findOne({
        //     where: {
        //         Email: req.body.email
        //     }
        // });
        console.log("Freelancer response:",freelancerUser)

        if(clientUser){res.status(200).send({clientUser,type:"client"});return}
        else if (freelancerUser){res.status(200).send({freelancerUser,type:"freelancer"});return}

        if (!clientUser || !freelancerUser) {
            res.status(409).send({ message: "Failed. User does not exist in both tables." });
            return;
        }

        // User exists in both tables, proceed with the request
       

    } catch (error) {
        console.error("Error checking for duplicate user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = checkDuplicate;
