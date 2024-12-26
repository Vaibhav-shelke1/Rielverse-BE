const express = require('express');
const router = express.Router();
const iLeadController = require('../controller/ILead-controller');

router.route('/createilead').post(iLeadController.createILead);
router.route('/getallileads').get(iLeadController.getAllILeads);
module.exports = router;