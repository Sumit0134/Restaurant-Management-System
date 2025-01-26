const mongoose = require("mongoose");

//restaurant details schema
const restaurantDetailsSchema = new mongoose.Schema({
  restaurantImage: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },

  restaurantLogo: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },

  restaurantLocation: {
    id: { type: String },
    lat: { type: Number },
    latdelta: { type: Number },
    lng: { type: Number },
    lngdelta: { type: Number },
    name: { type: String },
    address: { type: String },
  },

  restaurantDescription: {
    type: String,
  },

  restaurantTime: {
    openingTime: {
      type: String,
    },
    closingTime: {
      type: String,
    },
  },

  restaurantFoodTypes: {
    type: Array,
  },

  restaurantStatus: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
});

//export
module.exports = mongoose.model("RestaurantDetails", restaurantDetailsSchema);
