const restaurantModel = require("../models/restaurantModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//create restaurant
const registerRestaurantController = async (req, res) => {
  try {
    const {
      restaurantName,
      ownerName,
      ownerPhone,
      ownerEmail,
      password,
      restaurantAddress,
    } = req.body;

    if (
      !restaurantName ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail ||
      !password ||
      !restaurantAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existingRestaurant = await restaurantModel.findOne({ ownerEmail });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant with this email already exists, please login",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdRestaurant = await restaurantModel.create({
      restaurantName,
      ownerName,
      ownerPhone,
      ownerEmail,
      password: hashedPassword,
      restaurantAddress,
    });

    const token = jwt.sign(
      { id: createdRestaurant._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      createdRestaurant,
      id: createdRestaurant._id,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//login restaurant
const loginRestaurantController = async (req, res) => {
  try {
    const { ownerEmail, password } = req.body;

    if (!ownerEmail || !password) {
      return res.status(400).send({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existingRestaurant = await restaurantModel.findOne({ ownerEmail });
    if (!existingRestaurant) {
      return res.status(400).send({
        success: false,
        message:
          "Restaurant with this email does not exist, please register first",
      });
    }

    bcrypt.compare(password, existingRestaurant.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: existingRestaurant._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("token", token);

        existingRestaurant.password = undefined;

        return res.status(200).json({
          success: true,
          message: "Restaurant logged in successfully",
          existingRestaurant,
          token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Password does not match",
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

//logout restaurant
const logoutRestaurantController = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while logging out, please try again",
      error,
    });
  }
};

//export
module.exports = {
  registerRestaurantController,
  loginRestaurantController,
  logoutRestaurantController,
};
