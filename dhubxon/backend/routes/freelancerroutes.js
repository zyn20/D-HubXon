const express = require('express');
const router = express.Router();
const functions = require('../controller/freelancercontroller');
const checkDuplicate=require('../middleware/checkforduplicate');
const checkRecord=require("../middleware/check_frelancer_record");
const courseController = require('../controller/coursescontroller');
router.post('/courses', courseController.addCourse);
router.post('/signIn',functions.signIn);
router.post('/signUp', checkDuplicate,functions.signUp);
router.post('/verify', functions.verify) ;
router.post('/forgetpassword',checkRecord,functions.forgetpassword);
router.post('/verifypassword',functions.verifypassword);
router.post('/updatepassword',functions.update_password);
router.post('/AllProjects',functions.Allproject);
router.post('/setprofile',functions.setProfile);
router.get("/fetchprofiledata",functions.fetchprofiledata);
router.post("/resendOTP",functions.Re_send_OTP);


router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router