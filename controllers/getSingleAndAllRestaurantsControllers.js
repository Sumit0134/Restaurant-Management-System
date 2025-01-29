const restaurantModel = require("../models/restaurantModel");

//get all restaurants controller
const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find(
      {},
      "restaurantName ownerPhone restaurantAddress"
    );

    if (restaurants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No restaurants available at this time",
      });
    }

    return res.status(200).json({
      success: true,
      count: restaurants.length,
      message: "Restaurants available at this time",
      restaurants,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
      error,
    });
  }
};

//get single restaurant with name controller
const getSingleRestaurantController = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name is required",
      });
    }

    const normalizedInput = name.replace(/\s+/g, "").toLowerCase();

    const searchedRestaurant = await restaurantModel.findOne(
      {
        $expr: {
          $eq: [
            {
              $replaceAll: {
                input: "$restaurantName",
                find: " ",
                replacement: "",
              },
            },
            normalizedInput,
          ],
        },
      },
      "restaurantName ownerPhone restaurantAddress"
    );
    if (searchedRestaurant) {
      return res.status(200).json({
        success: true,
        message: "Restaurant found successfully",
        searchedRestaurant,
      });
    }

    const restaurants = await restaurantModel.find(
      {},
      "restaurantName ownerPhone restaurantAddress"
    );

    if (restaurants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No restaurants available at this time",
      });
    }

    return res.status(200).json({
      success: true,
      count: restaurants.length,
      message:
        "No restaurant found with this name, Restaurants available at this time",
      restaurants,
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
  getAllRestaurantsController,
  getSingleRestaurantController,
};
