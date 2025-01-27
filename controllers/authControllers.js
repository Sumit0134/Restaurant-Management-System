const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//register
const registerUserController = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
      return res.status(400).send({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existinguser = await userModel.findOne({ email, phone });
    if (existinguser) {
      return res.status(400).send({
        success: false,
        message:
          "Account with this email or phone number already exists, please login",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign(
      { id: createdUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token);

    return res.status(201).send({
      success: true,
      message: "Account registered successfully",
      token,
      createdUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while creating an account, please try again",
      error,
    });
  }
};

//login
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const existinguser = await userModel.findOne({ email });
    if (!existinguser) {
      return res.status(400).send({
        success: false,
        message: "Account does not exist, please register",
      });
    }

    bcrypt.compare(password, existinguser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: existinguser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("token", token);

        existinguser.password = undefined;

        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          token,
          existinguser,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Password does not match",
          err,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while logging in, please try again",
      error,
    });
  }
};

//logout
const logoutUserController = (req, res) => {
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
  registerUserController,
  loginUserController,
  logoutUserController,
};
