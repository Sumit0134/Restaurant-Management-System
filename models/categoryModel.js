const mongoose = require("mongoose");   

//category schema
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required"],
    },

    foodItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItems",
    }],
}, {timestamps: true});

//export
module.exports = mongoose.model("categories", categorySchema);