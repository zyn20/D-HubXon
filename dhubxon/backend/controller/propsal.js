// const jwt = require('jsonwebtoken');
// const Proposals = require('../models/proposals'); // Adjust the path to where your models are

// const getProposalsByOwner = async (req, res) => {
//   try {
//     // Decode the token received from the body without verification
//     const decodedToken = jwt.decode(req.body.token);

//     // Check if the decoded token is null or doesn't contain clientData
//     if (!decodedToken || !decodedToken.clientData) {
//       return res.status(400).send('Invalid token data.');
//     }

//     // Extract the email from the decoded token
//     const ownerEmail = decodedToken.clientData.email;

//     // Find all proposals where the PROPOSALOWNER matches the email
//     const proposals = await Proposals.findAll({
//       where: {
//         PROPOSALOWNER: ownerEmail,
//       },
//     });

//     // Send the proposals in the response
//     res.json(proposals);
//   } catch (error) {
//     // Handle any errors
//     console.error('Error fetching proposals by owner:', error);
//     res.status(500).send('An error occurred while fetching proposals.');
//   }
// };

// module.exports = {
//   getProposalsByOwner,
// };



const Proposals = require('../models/proposals'); // Adjust the path to where your models are

const getProposalsByProjectId = async (req, res) => {
  try {
    // Get project_id from the request body
    const { project_id } = req.body;

    // Validate that project_id is provided
    if (!project_id) {
      return res.status(400).send('Project ID is required.');
    }

    // Find all proposals where the PROJECTID matches the project_id from the request
    const proposals = await Proposals.findAll({
      where: {
        PROJECTID: project_id,
      },
    });

    // Send the proposals in the response
    res.json(proposals);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching proposals by project ID:', error);
    res.status(500).send('An error occurred while fetching proposals.');
  }
};

module.exports = {
  getProposalsByProjectId,
};
