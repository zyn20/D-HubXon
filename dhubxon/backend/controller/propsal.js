


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

// module.exports = {
//   getProposalsByProjectId,
// };

// const Proposals = require('../models/proposals'); // Adjust the path to where your models are

const getProposalsByTakenBy = async (req, res) => {
  try {
    // Get taken from the request body
    const { taken } = req.body;

    // Validate that taken is provided
    if (!taken) {
      return res.status(400).send('Taken variable is required.');
    }

    // Find all proposals where the takenby matches the taken from the request
    const proposals = await Proposals.findOne({
      where: {
        PROPOSALOWNER: taken,
      },
    });

    // Send the proposals in the response
    res.json(proposals);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching proposals by takenby:', error);
    res.status(500).send('An error occurred while fetching proposals.');
  }
};

module.exports = {
  getProposalsByTakenBy,
  getProposalsByProjectId,
};
