const express = require('express');
const router = express.Router();
const functions = require('../controller/freelancercontroller');
const checkDuplicate=require('../middleware/checkforduplicate_freelancer');
const checkRecord=require("../middleware/check_frelancer_record");




router.get('/signIn',functions.signIn);
router.post('/signUp', checkDuplicate,functions.signUp);
router.post('/verify', functions.verify) ;


router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router