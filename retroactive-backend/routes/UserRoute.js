const express = require("express");
// Importing the express module for building the API router.

const userController = require("../controllers/UserController");
// Importing the userController module containing user-related request handlers.

const router = express.Router();
// Creating an instance of express Router to define API routes.

router.post("/register", userController.registerEvent);
// Defining a POST route '/register' that will invoke the registerEvent function from the userController when accessed.

router.get("/login", userController.loginEvent);
// Defining a GET route '/login' that will invoke the loginEvent function from the userController when accessed.

router.get("/get", userController.getEvent);

router.put("/edit", userController.editEvent);
// Defining a PUT route '/editProfile' that will invoke the editProfile function from the userController when accessed.

router.put("/topUp", userController.topUpEvent);
// Defining a PUT route '/topUpEvent' that will invoke the topUp function from the userController when accessed.

router.get("/inventory", userController.inventoryFunction);
// Defining a GET route '/inventory' that will invoke the inventoryFunction function from the userController when accessed.

router.delete("/delete", userController.deleteEvent);
// Defining a DELETE route '/deleteEvent' that will invoke the deleteUser function from the userController when accessed.

module.exports = router;
// Exporting the router instance to be used by the main application file.
