const categoryModel = require("../models/categoryModel");

//create category
const createCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.body;
    console.log(categoryName);

    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existingCategory = await categoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with the same name already exists",
      });
    }

    const createdCategory = await categoryModel.create({
      categoryName,
    });

    await createdCategory.save();

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      createdCategory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//get all categories
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(400).json({
        success: false,
        message: "No categories found, please create a category first",
      });
    }

    return res.status(200).json({
      success: true,
      total: categories.length,
      message: `${categories.length} categories found`,
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//update category
const updateCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { categoryName: req.body.categoryName } },
      { new: true }
    );

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found, please create a category first",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//delete category
const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found, please create a category first",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//export
module.exports = {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  updateCategoryController,
};
