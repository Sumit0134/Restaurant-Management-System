const mongoose = require("mongoose");

//food schema
const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, "Food name is required"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
  },

  description: {
    type: String,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: [true, "Category is required"],
  },

  foodImage: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.GBKOdbD50IkAgwo_jeTWiQAAAA?rs=1&pid=ImgDetMain",
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: [true, "Restaurant is required"],
  },

  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },

  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
});

//export
module.exports = mongoose.model("foodItems", foodSchema);
