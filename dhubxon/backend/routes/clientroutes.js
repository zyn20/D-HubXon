const express = require('express')
const router = express.Router()
const checkforDuplicate = require("../middleware/checkforduplicate_client")
const checkRecord=require("../middleware/check_client_record")
const Functions = require("../controller/clientcontroller")


router.post('/signUp', checkforDuplicate, Functions.signUp);
router.post('/signIn' , Functions.signIn);
router.post('/verify', Functions.verify);
router.post('/forgetpassword',checkRecord,Functions.forgetpassword);
router.post('/verifypassword',Functions.verifypassword);
router.post('/updatepassword',Functions.update_password);

router.post("/post_project",Functions.Postproject);

router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router