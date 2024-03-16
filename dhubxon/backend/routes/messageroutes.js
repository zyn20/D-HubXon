const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatcontroller")

// Route to send a message
router.post('/send', chatController.sendMessage);

// Route to get chat history
router.get('/history', chatController.getChatHistory);

// Route to get unread messages
router.get('/unread', chatController.getUnreadMessages);

// Route to search chat history
router.get('/search', chatController.searchChatHistory);

// Route to filter chat history by date range
router.get('/filter', chatController.filterChatByDateRange);


router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;
