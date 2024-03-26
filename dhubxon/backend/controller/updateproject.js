const Project = require('../models/project'); // Adjust the path as necessary
const Proposal=require("../models/proposals")

// Controller to update the project
const updateProject = async (req, res) => {
  const { id, takenby } = req.body; // Extracting id and takenby from the request body

  if (!id || !takenby) {
    return res.status(400).send('Project ID and taken by field are required.');
  }

  try {
    // Find the project by ID and update it
    const project = await Project.findOne({ where: { id } });
    
    if (!project) {
      return res.status(404).send('Project not found.');
    }

    // Update the project's takenby and status
    await Project.update({ takenby, status: 'Active' }, { where: { id } });

    res.send('Project updated successfully.');
  } catch (error) {
    console.error('Error updating the project:', error);
    res.status(500).send('An error occurred while updating the project.');
  }
};

const completeProject = async (req, res) => {
  const { id } = req.body; // Extracting id from the request body

  if (!id) {
    return res.status(400).send('Project ID is required.');
  }

  try {
    // Check if the project exists
    const project = await Project.findOne({ where: { id } });
    
    if (!project) {
      return res.status(404).send('Project not found.');
    }

    // Update the project's status to 'Completed'
    await Project.update({ status: 'Done' }, { where: { id } });

    res.send('Project marked as completed successfully.');
  } catch (error) {
    console.error('Error marking the project as completed:', error);
    res.status(500).send('An error occurred while updating the project status to completed.');
  }
};

module.exports = {
  updateProject,
  completeProject
};