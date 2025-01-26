const express = require("express");

//router object
const router = express.Router();

//contollers
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { reset } = require("colors");

//routes
//get user GET
router.get("/getuser", isLoggedIn, getUserController);

//update user PUT
router.put("/updateuser", isLoggedIn, updateUserController);

//update password POST
router.post("/updatepassword", isLoggedIn, updatePasswordController);

//reset password POST
router.post("/resetpassword", isLoggedIn, resetPasswordController);

//delete user DELETE
router.delete("/deleteuser", isLoggedIn, deleteUserController);

//export
module.exports = router;
