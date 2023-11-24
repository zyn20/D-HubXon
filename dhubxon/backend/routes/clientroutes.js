const express = require('express')
const router = express.Router()
const checkforDuplicate = require("../middleware/checkforduplicate_client")
const checkRecord=require("../middleware/check_client_record")
const Functions = require("../controller/clientcontroller")


router.post('/signUp', checkforDuplicate, Functions.signUp);
router.get('/signIn' , Functions.signIn);
router.post('/verify', Functions.verify);




router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router