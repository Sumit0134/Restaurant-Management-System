const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  registerUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/authControllers");

//routes
//register POST
router.post("/register", registerUserController);

//login POST
router.post("/login", loginUserController);

//logout POST
router.post("/logout", logoutUserController);

//export
module.exports = router;
