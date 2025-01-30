const foodModel = require("../models/foodModel");
const categoryModel = require("../models/categoryModel");

//create food item
const createFoodController = async (req, res) => {
  try {
    const { foodName, price, category, restaurant, quantity } = req.body;

    if (!foodName || !price || !category || !restaurant || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existingCategory = await categoryModel.findOne({ _id: category });
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist, please create a category first",
      });
    }

    const existingFoodItem = await foodModel.findOne({ foodName, category });
    if (existingFoodItem) {
      return res.status(400).json({
        success: false,
        message: "Food item with the same name already exists",
      });
    }

    const createdFoodItem = await foodModel.create({
      foodName,
      price,
      category,
      restaurant,
      quantity,
    });

    existingCategory.foodItems.push(createdFoodItem._id);
    await existingCategory.save();

    return res.status(200).json({
      success: true,
      message: "Food item created successfully",
      createdFoodItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//update food items
const updateFoodController = async (req, res) => {
  try {
    const { foodName, price, quantity, category } = req.body;

    const existingFoodItem = await foodModel.findOne({ _id: req.params.id });
    if (!existingFoodItem) {
      return res.status(400).json({
        success: false,
        message: "Food item does not exist, please create a food item first",
      });
    }

    if (category && category !== existingFoodItem.category.toString()) {
      const existingCategory = await categoryModel.findOne({ _id: category });
      if (!existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category does not exist, please create a category first",
        });
      }

      const oldCategory = await categoryModel.findOne({
        _id: existingFoodItem.category,
      });
      oldCategory.foodItems.pull(req.params.id);
      await oldCategory.save();

      existingCategory.foodItems.push(req.params.id);
      await existingCategory.save();
    }

    const updatedFoodItem = await foodModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { foodName, price, quantity, category } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      food: updatedFoodItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//delete food item
const deleteFoodController = async (req, res) => {
  try {
    const food = await foodModel.findOneAndDelete({ _id: req.params.id });
    if (!food) {
      return res.status(400).json({
        success: false,
        message: "Food item does not exist, please create a food item first",
      });
    }

    const existingCategory = await categoryModel.findOne({
      _id: food.category,
    });
    existingCategory.foodItems.pull(req.params.id);
    await existingCategory.save();

    return res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
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
module.exports = { createFoodController, updateFoodController, deleteFoodController };
