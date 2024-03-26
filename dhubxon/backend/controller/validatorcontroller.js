const bcrypt = require('bcrypt');
const Validator = require('../models/validator'); // Assuming Validator model is exported from '../models'

const signup = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password } = req.body;

    // Validate incoming data (you can use a validation library like Joi or express-validator)
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if the email is already registered
    const existingValidator = await Validator.findOne({ where: { Email: email } });
    if (existingValidator) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new validator record
    const newValidator = await Validator.create({
      Name: name,
      Email: email,
      Password: hashedPassword,
    });

    // Return success response
    return res.status(201).json({ message: 'Validator created successfully', data: newValidator });
  } catch (error) {
    console.error('Error creating validator:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup };
