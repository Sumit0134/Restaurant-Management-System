//test user
const testUserController = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Test User Controller",
    });
  } catch (error) {
    return res.status({
      success: false,
      message: "Error while testing user controller",
      error,
    });
  }
};

//export
module.exports = {
  testUserController,
};
