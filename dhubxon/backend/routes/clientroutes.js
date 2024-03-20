const express = require("express");
const router = express.Router();
const checkforDuplicate = require("../middleware/checkforduplicate");
const checkRecord = require("../middleware/check_existing_record");
const Functions = require("../controller/clientcontroller");
const courseController = require("../controller/coursescontroller");
const { handlePurchase } = require('../controller/purchasecontroller'); // Adjust the path as needed
const { getProposalsByOwner }= require('../controller/projects');
const { getProposalsByProjectId }= require('../controller/propsal');
const { getProposalsByTakenBy}= require('../controller/propsal');


const {   updateProject }= require('../controller/updateproject');
const {  completeProject }= require('../controller/updateproject');


router.post('/purchase', handlePurchase);

router.post('/update-project', updateProject);
router.post('/complete-project', completeProject);


router.post("/projects", getProposalsByOwner);
router.post("/proposals", getProposalsByProjectId);
router.post("/oneproposals", getProposalsByTakenBy);
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
router.get("/clients",Functions.getAllClients);

router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;





