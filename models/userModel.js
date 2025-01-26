const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "userName is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    address: {
      type: Array,
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
      unique: true,
    },

    userType: {
      type: String,
      default: "customer",
    },

    profileImage: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
