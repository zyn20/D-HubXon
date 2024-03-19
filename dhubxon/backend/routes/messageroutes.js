const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatcontroller")

// Route to send a message
router.post('/send', chatController.sendMessage);

// Route to get chat history
router.get('/fetch-chat', chatController.getMessagesBetweenUsers);

router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;
