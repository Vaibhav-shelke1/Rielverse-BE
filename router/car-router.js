const express = require("express");
const router = express.Router();
const carcontroller = require('../controller/car-controller');
router.route("/carBrandInsert").get(carcontroller.carBrandInsert);
router.route("/carBrand").get(carcontroller.carBrand);
router.route("/carBrandWiseModel/:id").get(carcontroller.carBrandWiseModel);
router.route("/carModelWiseEngine/:name").get(carcontroller.carModelWiseEngine);
router.route("/carModelWiseDoor/:name").get(carcontroller.carModelWiseDoor);
module.exports = router;