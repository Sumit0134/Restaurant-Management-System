const mongoose = require("mongoose");

const colors = require("colors");

//database connection
const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Database connected: `.yellow + `${mongoose.connection.host}`.cyan
    );
  } catch (error) {
    console.log(`Error connecting to database: `.red + `${error}`.red);
  }
};

//export
module.exports = connection;
