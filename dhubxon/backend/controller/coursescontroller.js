// Import the Course model
const Course = require('../models/courses');
const path = require('path');
// Controller to add a new course
const addCourse = async (req, res) => {
  try {
  

    const { Email,category, description, price, rating, title } = req.body;

    // Handle the uploaded image file
    let imagePath = '';
    if (req.file) {
      // Construct the path relative to the 'uploads' folder
      imagePath = '/uploads/' + req.file.filename;
    }

    // Create a new course using the Sequelize model
    const newCourse = await Course.create({
      Email,
      category,
      description,
      image: imagePath, // Use the image path from the uploaded file
      price,
      rating,
      title,
    });


    res.status(201).json(newCourse);






  } catch (error) {
    // Handle errors
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllCourses = async (req, res) => {
  const email=req.query.email;
  console.log("---------------------------------------------------------");
  // console.log("All Courses Email:",email)
  console.log("---------------------------------------------------------");

  try {

    const courses = await Course.findAll();

    // Respond with the list of courses
    res.status(200).json(courses);
  } catch (error) {
    // Handle errors
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addCourse,
  getAllCourses
};
