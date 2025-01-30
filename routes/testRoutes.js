const express = require("express");

//router object
const router = express.Router();

//controllers
const { testUserController } = require("../controllers/testController");

//routes
//routes GET | POST | PUT | DELETE
router.get("/test-user", testUserController);

//export
module.exports = router;
