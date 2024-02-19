// Import the Course model
const Course = require('../models/courses');
const path = require('path');
const jwt = require('jsonwebtoken');
const addCourse = async (req, res) => {
  try {
    const { category, description, price, rating, title, token } = req.body; // Extract token from the request body

    // Decode the token to get the freelancer's email
    let freelancerEmail = '';
    if (token) {
      const decoded = jwt.decode(token); // Decode the token without verifying
      freelancerEmail = decoded.freelancerData.email; // Extract email from the token payload
    } else {
      return res.status(400).json({ error: 'Token is required' });
    }

    let imagePath = '';
    let zipPath = '';

    if (req.files) {
      if (req.files.image) {
        imagePath = '/uploads/' + req.files.image[0].filename;
      }
      if (req.files.zipFile) {
        zipPath = '/uploads/' + req.files.zipFile[0].filename;
      }
    }

    // Include the freelancer's email in the data you're saving
    const newCourse = await Course.create({
      category,
      description,
      image: imagePath,
      price,
      rating,
      title,
      zipPath, // Save the zip file path
      email: freelancerEmail, // Save the freelancer's email extracted from the token
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const getAllCourses = async (req, res) => {
  try {
    // Retrieve all courses from the database
    const courses = await Course.findAll();

    // Respond with the list of courses
    res.status(200).json(courses);
  } catch (error) {
    // Handle errors
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};








const getCoursesByEmail = async (req, res) => {
  try {
    const { token } = req.body; // Extract token from the request body

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Assuming jwt.decode is correctly decoding the token
    const decoded = jwt.decode(token); 
    const email = decoded?.freelancerData?.email;

    if (!email) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Use Sequelize's findOne or findAll method
    const courses = await Course.findAll({
      where: { email: email }
    });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: 'No courses found for this email' });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting courses by email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addCourse,
  getAllCourses,
  getCoursesByEmail, // Add the new controller function to the exports
};




// module.exports = {
//   addCourse,
//   getAllCourses
// };
