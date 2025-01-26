const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  getRestaurantDetailsController,
  updateRestaurantDetailsController,
} = require("../controllers/restaurantControllers");  
const { isLoggedIn } = require("../middlewares/authMiddleware");

//routes
//get restaurant details GET
router.get("/get-restaurant-details", isLoggedIn, getRestaurantDetailsController);

//update restaurant details PUT
router.post("/update-restaurant-details", isLoggedIn, updateRestaurantDetailsController);

//export
module.exports = router;
