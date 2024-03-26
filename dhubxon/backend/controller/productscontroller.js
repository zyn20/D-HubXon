// Import the Products model
const Products = require('../models/products'); // Assuming your model file is named 'products.js'
const path = require('path');
const jwt = require('jsonwebtoken');

const addProduct = async (req, res) => {
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
    const newProduct = await Products.create({
      category,
      description,
      image: imagePath,
      price,
      rating,
      title,
      zipPath, // Save the zip file path
      email: freelancerEmail, // Save the freelancer's email extracted from the token
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Products.findAll();

    // Respond with the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsByEmail = async (req, res) => {
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
    const products = await Products.findAll({
      where: { email: email }
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found for this email' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products by email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params; // Extract the product ID from the request parameters

    // Use Sequelize's destroy method to delete the product
    const result = await Products.destroy({
      where: { id: productId }
    });

    if (result === 0) {
      // No product was deleted (possibly because the product was not found)
      return res.status(404).json({ error: 'Product not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsByEmail, 
  deleteProductById,
};
