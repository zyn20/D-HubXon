const express = require("express");
const router = express.Router();
const ValidatorController = require("../controller/validatorcontroller")


router.post('/signup',  ValidatorController.signup);

router.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

module.exports = router;


