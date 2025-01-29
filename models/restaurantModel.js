const mongoose = require("mongoose");

//restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      unique: true,
    },

    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
    },

    ownerEmail: {
      type: String,
      required: [true, "Owner email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    ownerPhone: {
      type: String,
      required: [true, "Owner phone number is required"],
    },

    restaurantAddress: {
      type: String,
      required: [true, "Address is required"],
    },

    userType: {
      type: String,
      default: "restaurant",
    },

    restaurantDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantDetails",
    },
  },

  { timestamps: true }
);

//export
module.exports = mongoose.model("Restaurant", restaurantSchema);
