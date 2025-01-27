const restaurantDetailsModel = require("../models/restaurantDetailsModel");
const restaurantModel = require("../models/restaurantModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//get restaurant details controller
const getRestaurantDetailsController = async (req, res) => {
  try {
    const restaurant = await restaurantModel
      .findOne({ _id: req.body.id })
      .populate("restaurantDetails");

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant not found, please create a restaurant first",
      });
    }

    const restaurantDetails = restaurant.restaurantDetails || {};

    const filteredRestaurantData = {
      restaurantName: restaurant.restaurantName,
      restaurantID: restaurant.restaurantID,
      ownerName: restaurant.ownerName,
      ownerEmail: restaurant.ownerEmail,
      ownerPhone: restaurant.ownerPhone,
      restaurantAddress: restaurant.restaurantAddress,
    };

    const combinedDetails = {
      ...filteredRestaurantData,
      ...restaurantDetails._doc,
    };

    return res.status(200).json({
      success: true,
      message: "Restaurant details fetched successfully",
      combinedDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//update restaurant details controller
const updateRestaurantDetailsController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findOne({ _id: req.body.id });

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant not found, please create a restaurant first",
      });
    }

    let restaurantDetails;
    if (restaurant.restaurantDetails) {
      restaurantDetails = await restaurantDetailsModel.findById(
        restaurant.restaurantDetails
      );
    }

    if (!restaurantDetails) {
      restaurantDetails = await restaurantDetailsModel.create({
        restaurant: restaurant._id,
      });
    }

    restaurant.ownerName = req.body.ownerName || restaurant.ownerName;
    restaurant.ownerPhone = req.body.ownerPhone || restaurant.ownerPhone;
    restaurant.restaurantAddress =
      req.body.restaurantAddress || restaurant.restaurantAddress;

    restaurantDetails.restaurantImage =
      req.body.restaurantImage || restaurantDetails.restaurantImage;
    restaurantDetails.restaurantLogo =
      req.body.restaurantLogo || restaurantDetails.restaurantLogo;
    restaurantDetails.restaurantLocation =
      req.body.restaurantLocation || restaurantDetails.restaurantLocation;
    restaurantDetails.restaurantDescription =
      req.body.restaurantDescription || restaurantDetails.restaurantDescription;
    restaurantDetails.restaurantTime =
      req.body.restaurantTime || restaurantDetails.restaurantTime;
    restaurantDetails.restaurantFoodTypes =
      req.body.restaurantFoodTypes || restaurantDetails.restaurantFoodTypes;
    restaurantDetails.restaurantStatus =
      req.body.restaurantStatus || restaurantDetails.restaurantStatus;

    await restaurant.save();
    await restaurantDetails.save();

    restaurant.restaurantDetails = restaurantDetails._id;
    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant details updated successfully",
      restaurant,
      restaurantDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//update password
const updateRestaurantPasswordController = async (req, res) => {
  try {
    console.log(req.body);
    const restaurant = await restaurantModel.findOne({ _id: req.body.id });
    console.log(restaurant);
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant does not exist, please create a restaurant first",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    bcrypt.compare(oldPassword, restaurant.password, async (error, result) => {
      if (result) {
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        restaurant.password = hashedPassword;

        await restaurant.save();

        return res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect",
          error,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//reset password
const resetRestaurantPasswordController = async (req, res) => {
  try {
    const { ownerEmail, newPassword } = req.body;

    if (!ownerEmail || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const restaurant = await restaurantModel.findOne({ ownerEmail });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant does not exist, please create a restaurant first",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    restaurant.password = hashedPassword;

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//delete restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findOneAndDelete({
      _id: req.body.id,
    });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant does not exist, please create a restaurant first",
      });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
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
  getRestaurantDetailsController,
  updateRestaurantDetailsController,
  updateRestaurantPasswordController,
  resetRestaurantPasswordController,
  deleteRestaurantController,
};
