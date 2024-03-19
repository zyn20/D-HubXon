const Project = require('../models/project'); // Adjust the path as necessary

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

module.exports = {
  updateProject
};
