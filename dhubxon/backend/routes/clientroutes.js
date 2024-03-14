const express = require("express");
const router = express.Router();
const checkforDuplicate = require("../middleware/checkforduplicate");
const checkRecord = require("../middleware/check_existing_record");
const Functions = require("../controller/clientcontroller");
const courseController = require("../controller/coursescontroller");

const chatController = require("../controller/chatcontroller")


router.get("/courses", courseController.getAllCourses);
router.post("/signUp", checkforDuplicate, Functions.signUp);
router.post("/signIn", Functions.signIn);
router.post("/verify",Functions.verify);
router.post("/forgetpassword", Functions.forgetpassword);
router.post("/verify_forgetpass_OTP", Functions.verifypassword);
router.post("/updatepassword", Functions.update_password);
router.post("/setprofile", Functions.setProfile);
router.post("/post_project", Functions.Postproject);
router.get("/fetchprofiledata", Functions.fetchprofiledata);
router.post("/resendOTP", Functions.Re_send_OTP);



// Route to send a message
router.post('/message/send', chatController.sendMessage);

// Route to get chat history
router.get('/message/history', chatController.getChatHistory);

// Route to get unread messages
router.get('/message/unread', chatController.getUnreadMessages);

// Route to search chat history
router.get('/message/search', chatController.searchChatHistory);

// Route to filter chat history by date range
router.get('/message/filter', chatController.filterChatByDateRange);

// Route to get chat count
router.get('/message/count', chatController.getChatCount);

// Route to delete a message
router.delete('/message/:messageId', chatController.deleteMessage);

// Route to update a message
router.put('/message/:messageId', chatController.updateMessage);

// Route to get message by ID
router.get('/message/:messageId', chatController.getMessageById);

// Route to mark message as read
router.put('/message/:messageId/read', chatController.markMessageAsRead);

// Route to get chat participants
router.get('/message/participants', chatController.getChatParticipants);

// Route to get message statistics
router.get('/message/statistics', chatController.getMessageStatistics);

// Route to get last message
router.get('/message/last', chatController.getLastMessage);


router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;





