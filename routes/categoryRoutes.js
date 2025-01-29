const express = require("express");

//router object
const router = express.Router();

//controllers
const {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  updateCategoryController,
} = require("../controllers/categoryControllers");
const { isLoggedIn } = require("../middlewares/authMiddleware");

//category routes POST
router.post("/create-category", isLoggedIn, createCategoryController);

//get all categories routes GET
router.get("/get-all-categories", isLoggedIn, getAllCategoriesController);

//update category routes PUT
router.put("/update-category/:id", isLoggedIn, updateCategoryController);

//delete category routes DELETE
router.delete("/delete-category/:id", isLoggedIn, deleteCategoryController);

//export
module.exports = router;
