const bcrypt = require('bcrypt');
const Validator = require('../models/validator'); // Assuming Validator model is exported from '../models'
const jwt = require("jsonwebtoken");
const DisputeRequest=require("../models/disputeRequests")

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
  const signIn = async (req, res) => {
    try {
      
      const { email, password } = req.body;
  
      // Validate incoming data (you can use a validation library like Joi or express-validator)
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Find the validator in the database based on the provided email
      const validator = await Validator.findOne({ where: { Email: email } });
  
      // If no validator found, return an error
      if (!validator) {
        console.error('Failed to sign in: User not found');
        return res.status(404).json({ error: 'Login failed' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, validator.Password);
  
      // If passwords don't match, return an error
      if (!passwordMatch) {
        console.error('Failed to sign in: Incorrect password');
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // Generate JWT token with validator data
      const tokenPayload = {
        id: validator.id,
        name: validator.Name,
        email: validator.Email,
        // Add any other validator data you want to include in the token payload
      };
      const token = jwt.sign(tokenPayload, 'NATIONAL UNIVERSITY', { expiresIn: '1h' });
  
      // Return the token and validator data in the response
      res.status(200).json({
        token,
        message: 'Sign in successful',
        validator: tokenPayload,
      });
    } catch (error) {
      console.error('Failed to sign in:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const FetchRequest =  async (req, res) => {
    try {
      // Fetch all ClaimSubscriptions from the database
      const Requests = await DisputeRequest.findAll({
        where: {
          SOLVED: false
        }
      });
  
      // If there are no ClaimSubscriptions found, return 404
      if (!Requests) {
        return res.status(404).json({ message: 'No ClaimSubscriptions found' });
      }
  
      // If ClaimSubscriptions are found, return them as a response
      res.json(Requests);
    } catch (error) {
      // If there's an error, return 500 Internal Server Error
      console.error('Error fetching ClaimSubscriptions:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  const UpdateRequest = async (req, res) => {
    const id = req.body.ID;
    try {
      // Update the SOLVED attribute to true for the given request ID
      const updatedRequest = await DisputeRequest.update(
        { SOLVED: true },
        {
          where: {
            id: id,
            SOLVED: false // Ensuring the request is currently marked as unsolved before updating
          }
        }
      );
  
      // Check if any record was updated
      if (updatedRequest[0] === 0) {
        // If no record was updated, return 404
        return res.status(404).json({ message: 'No unsolved DisputeRequest found with the provided ID' });
      }
  
      // If the record was updated successfully, return success message
      res.json({ message: 'SOLVED attribute updated successfully' });
    } catch (error) {
      // If there's an error, return 500 Internal Server Error
      console.error('Error updating SOLVED attribute:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


module.exports = { signup,signIn,FetchRequest,UpdateRequest };



