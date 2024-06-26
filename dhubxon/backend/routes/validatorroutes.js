const express = require("express");
const router = express.Router();
const ValidatorController = require("../controller/validatorcontroller")

const FreelancerController = require("../controller/freelancercontroller");



router.post('/signup',  ValidatorController.signup);
router.post('/signin', ValidatorController.signIn);
router.get('/fetch-Dispute-requests', ValidatorController.FetchRequest);
router.post('/updateRequest', ValidatorController.UpdateRequest);


router.get('/fetch-requests',  FreelancerController.FetchRequest);

router.get('/fetch-details',  FreelancerController.FetchSubscriptionDetail);

router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;




