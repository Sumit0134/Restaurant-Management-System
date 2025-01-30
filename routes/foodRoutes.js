const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  createFoodController,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodControllers");

//routes
//create food POST
router.post("/create-food", createFoodController);

//update food PUT
router.put("/update-food/:id", updateFoodController);

//delete food DELETE
router.delete("/delete-food/:id", deleteFoodController);

//export
module.exports = router;
