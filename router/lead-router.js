const express = require('express');
const leadController = require('../controller/lead-controller');
const router = express.Router();

router.route("/createlead").post(leadController.createLead);
router.route('/getalllead').get(leadController.getAllLeads);
router.route('/requestotp').post(leadController.sendOTPVerificationEmail);
router.route('/verifyotp').post(leadController.verifyOTP);
router.route('/resendotp').post(leadController.resendOTP);
router.route('/updatelead').post(leadController.updateLead);
module.exports = router;