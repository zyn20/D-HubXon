
const jwt = require('jsonwebtoken');
const Purchase = require('../models/purchase'); // Adjust path as needed
const Course = require('../models/courses'); // Import the Course model
const { sendPurchaseConfirmationEmail } = require('../controller/nodemailer/newmailer'); // Assume you rename your function

// Example POST /client/purchase route handler
const handlePurchase = async (req, res) => {
  const { token, items, name, address, postalCode, creditCardNo } = req.body;

  try {
    const decoded = jwt.decode(token);
    const email = decoded?.clientData?.email;
    if (!email) {
      console.log("Email not found");
      return res.status(400).json({error: 'Token is invalid or does not contain an email address.'});
    }

    // Process each item in the items array
    for (const item of items) {
      const { id: itemId, amount, price } = item;
      
      // Create a purchase record for each item
      await Purchase.create({
        email: email,
        itemId: itemId,
        Amount: price,
        name: name,
        address: address,
        creditCardNo: creditCardNo,
        postalCode: postalCode
      });

      // Retrieve the Course by itemId to get the zipPath
      const course = await Course.findOne({ where: { id: itemId } });
      if (course && course.zipPath) {
        // Construct a URL to the zip file
        const zipFileURL = `http://127.0.0.1:5000${course.zipPath}`;

        // Prepare and send an email with the zip file URL
        const emailContent = `Thank you for your purchase! Item ID: ${itemId}, Quantity: ${amount}, Price: ${price}. Your item will be shipped to: ${address}. You can download your files here: ${zipFileURL}`;
        await sendPurchaseConfirmationEmail(email, emailContent);
      } else {
        console.log(`No course found for itemId: ${itemId}, or no zipPath available.`);
      }
    }

    console.log("Purchase successful.");
    res.status(200).json({ success: 'Purchase successful.' });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ error: 'An error occurred during the purchase.' });
  }
};

module.exports = { handlePurchase };
