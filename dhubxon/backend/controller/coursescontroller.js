// Import the Course model
const Course = require('../models/courses');

// Controller to add a new course
const addCourse = async (req, res) => {
  try {
    // Extract data from the request body
    const { category, description, image, price, rating, title } = req.body;

    // Create a new course using the Sequelize model
    const newCourse = await Course.create({
      category,
      description,
      image,
      price,
      rating,
      title,
    });

    // Respond with the newly created course data
    res.status(201).json(newCourse);
  } catch (error) {
    // Handle errors
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


module.exports = {
  addCourse,
  getAllCourses
};
