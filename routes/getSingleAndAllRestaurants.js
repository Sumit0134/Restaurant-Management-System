const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  getAllRestaurantsController,
  getSingleRestaurantController,
} = require("../controllers/getSingleAndAllRestaurantsControllers");

//get all restaurants GET
router.get("/get-all-restaurants", getAllRestaurantsController);

//get single restaurant with name GET
router.get("/get-single-restaurant/:name", getSingleRestaurantController);

//export
module.exports = router;
