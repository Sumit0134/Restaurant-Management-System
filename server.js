const express = require("express");

const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//rest object
const app = express();

//config
dotenv.config();

//port
const port = process.env.PORT || 5000;

//database connection import
const database = require("./config/mongodbConfig");

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//database connection
database();

//import routes
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authRestaurantRoutes = require("./routes/authRestaurantRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/authrestaurant", authRestaurantRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);

//default
app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      `<h1 style="color: orange;">Welcome to Online Restaurant Server App</h1>`
    );
});

//listen
app.listen(port, () => {
  console.log(`Server is running at port: `.yellow + `${port}`.cyan);
});
