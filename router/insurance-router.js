const express = require("express");
const router = express.Router();
const insuranceController = require('../controller/insurance-controller');
router.route("/getinsurancepackages").post(insuranceController.getinsurancepackages);
router.route("/sendRequest").post(insuranceController.sendRequest);
router.route("/printPolicyPdf").get(insuranceController.printPolicyPdf);
router.route("/issuePolicy").post(insuranceController.issuePolicy);
module.exports = router;