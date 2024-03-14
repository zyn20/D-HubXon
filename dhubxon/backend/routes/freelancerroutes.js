const express = require('express');
const router = express.Router();
const functions = require('../controller/freelancercontroller');
const checkDuplicate=require('../middleware/checkforduplicate');
const checkRecord=require("../middleware/check_existing_record");
const courseController = require('../controller/coursescontroller');

const chatController = require('../controller/chatcontroller');




const path = require('path'); // Import the path module

const multer = require('multer');

// Set up storage directory (you might want to customize this)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });





router.post('/courses', upload.single('image'), courseController.addCourse);



// router.post('/courses', courseController.addCourse);
router.post('/signIn',functions.signIn);
router.post('/signUp', checkDuplicate,functions.signUp);
router.post('/verify', functions.verify) ;
router.post('/forgetpassword',functions.forgetpassword);
router.post('/verify_forgetpass_OTP',functions.verifypassword);
router.post('/updatepassword',functions.update_password);
router.post('/AllProjects',functions.Allproject);
router.post('/setprofile',functions.setProfile);
router.get("/fetchprofiledata",functions.fetchprofiledata);
router.post("/resendOTP",functions.Re_send_OTP);
router.get("/fetchBESTMATCHES",functions.BESTMATCH);
router.get("/fetchcourses",courseController.getAllCourses);
router.post("/ADDcommunity_post",functions.addPost);
router.get("/GETcommunity_post",functions.getAllPost);
router.post("/CHANGELIKEcommunity_post",functions.CHANGELIKE);
router.post("/ADD_POST_COMMENT",functions.ADD_POST_COMMENT);
router.get("/fetchpostcomments",functions.fetchpostcomments);
router.post("/INCREMENT_POST_COMMENT",functions.INCREMENT_POST_COMMENT);
router.get("/fetchprofileurl",functions.fetchprofileurl);


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



router.get('/message/history', chatController.getChatHistory);
router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router