const express = require('express');
const router = express.Router();
const functions = require('../controller/freelancercontroller');
const checkDuplicate=require('../middleware/checkforduplicate');
const checkRecord=require("../middleware/check_existing_record");
const courseController = require('../controller/coursescontroller');
const productController=require('../controller/productscontroller');
const { searchPurchasesByItemId } = require('../controller/purchasecontroller');


// const path = require('path'); // Import the path module

// const multer = require('multer');

// // Set up storage directory (you might want to customize this)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // the folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Setup to handle multiple fields
const fileFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'zipFile', maxCount: 1 }
]);



// router.post('/courses', upload.single('image'), courseController.addCourse);

router.post('/courses', fileFields, courseController.addCourse);
router.delete('/course/:courseId', courseController.deleteCourseById);
router.post('/courseOne',courseController.getCoursesByEmail);
router.post('/products', fileFields, productController.addProduct);
router.delete('/products/:courseId', productController. deleteProductById);
router.post('/productOne',productController.getProductsByEmail);

router.post('/purchaseitem',searchPurchasesByItemId);

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
router.get("/GETcommunity_mypost",functions.getmyPost);
router.post("/CHANGELIKEcommunity_post",functions.CHANGELIKE);
router.post("/ADD_POST_COMMENT",functions.ADD_POST_COMMENT);
router.post("/ADD_REPLY_COMMENT",functions.ADD_REPLY_COMMENT);
router.get("/fetchpostcomments",functions.fetchpostcomments);
router.get("/fetchreplycomments",functions.fetchreplycomments);
router.post("/INCREMENT_POST_COMMENT",functions.INCREMENT_POST_COMMENT);
router.get("/fetchprofileurl",functions.fetchprofileurl);
router.post("/deletepost",functions.DELETEPOST);
router.post("/deletecomment",functions.DELETECOMMENT);
router.post("/deleteReplycomment",functions.DELETEREPLYCOMMENT);

router.post("/submitproposal",functions.SubmitProposals);

router.get('/freelancers', functions.getAllFreelancers);
router.post('/create-subscription',functions.createSubscription);

router.get('/subscription-status', functions.getSubscriptionStatus);

router.post('/unsubscribe', functions.unsubscribe);



router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router