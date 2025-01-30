const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

//get user
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found, please register",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Account found",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Account not found, please register",
      error,
    });
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found, please register",
      });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Account not found, please register",
      error,
    });
  }
};

//update password
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found, please register",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    bcrypt.compare(oldPassword, user.password, async (error, result) => {
      if (result) {
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        user.password = hashedPassword;

        await user.save();

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
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Star marked fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account with this email does not exist, please register",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Account with this email does not exist, please register",
      error,
    });
  }
};

//delete user
const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findOneAndDelete({ _id: req.body.id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found, please register",
      });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
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
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
