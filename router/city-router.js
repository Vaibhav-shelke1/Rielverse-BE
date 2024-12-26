const express = require("express");
const router = express.Router();
const citycontroller = require('../controller/city-controller');
router.route("/cityInsert").get(citycontroller.CityInsert);
router.route("/citylist").get(citycontroller.Cityget);
module.exports = router;