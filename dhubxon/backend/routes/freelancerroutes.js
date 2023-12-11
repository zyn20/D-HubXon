const express = require('express');
const router = express.Router();
const functions = require('../controller/freelancercontroller');
const checkDuplicate=require('../middleware/checkforduplicate_freelancer');
const checkRecord=require("../middleware/check_frelancer_record");
const jwt=require("../middleware/freelancerjwt");
const courseController = require('../controller/coursescontroller');
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
router.post('/forgetpassword',checkRecord,functions.forgetpassword);
router.post('/verifypassword',functions.verifypassword);
router.post('/updatepassword',functions.update_password);
router.post('/AllProjects',functions.Allproject);
router.post('/setprofile',functions.setProfile);

router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router