const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  getRestaurantDetailsController,
  updateRestaurantDetailsController,
  updateRestaurantPasswordController,
  resetRestaurantPasswordController,
  deleteRestaurantController,
} = require("../controllers/restaurantControllers");

//middlewares
const { isLoggedIn } = require("../middlewares/authMiddleware");

//routes
//get restaurant details GET
router.get(
  "/get-restaurant-details",
  isLoggedIn,
  getRestaurantDetailsController
);

//update restaurant details PUT
router.put(
  "/update-restaurant-details",
  isLoggedIn,
  updateRestaurantDetailsController
);

//update password POST
router.post(
  "/update-restaurant-password",
  isLoggedIn,
  updateRestaurantPasswordController
);

//reset password POST
router.post(
  "/reset-restaurant-password",
  isLoggedIn,
  resetRestaurantPasswordController
);

//delete restaurant DELETE
router.delete("/delete-restaurant", isLoggedIn, deleteRestaurantController);

//export
module.exports = router;
