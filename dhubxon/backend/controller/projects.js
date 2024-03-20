const jwt = require('jsonwebtoken');
const Project = require('../models/project'); // Adjust the path to where your models are

const getProposalsByOwner = async (req, res) => {
  try {
    // Decode the token received from the body without verification
    const decodedToken = jwt.decode(req.body.token);

    // Check if the decoded token is null or doesn't contain clientData
    if (!decodedToken || !decodedToken.clientData) {
      return res.status(400).send('Invalid token data.');
    }

    // Extract the email from the decoded token
    const ownerEmail = decodedToken.clientData.email;

    // Find all proposals where the PROPOSALOWNER matches the email
    const proposals = await Project.findAll({
      where: {
        projectowner: ownerEmail,
      },
    });

    // Send the proposals in the response
    res.json(proposals);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching proposals by owner:', error);
    res.status(500).send('An error occurred while fetching proposals.');
  }
};

module.exports = {
  getProposalsByOwner,
};
