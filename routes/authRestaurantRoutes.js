const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  registerRestaurantController,
  loginRestaurantController,
  logoutRestaurantController,
} = require("../controllers/authRestaurantControllers");

//routes
//register POST
router.post("/register", registerRestaurantController);

//login POST
router.post("/login", loginRestaurantController);

//logout POST
router.post("/logout", logoutRestaurantController);

//export
module.exports = router;
