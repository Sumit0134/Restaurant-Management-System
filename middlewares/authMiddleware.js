const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

//middleware
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.id = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please login again",
      error,
    });
  }
};

//export
module.exports = {
  isLoggedIn,
};
