// Importing the Express library to create and manage the server, routes, and middleware.
const express = require("express");

// Importing the userController from the 'Controllers' directory, which handles user-related API endpoints.
const userController = require("../Controllers/UserController");

// Creating a new router object from Express to handle incoming HTTP requests and map them to corresponding controllers.
const router = express.Router();

// Registering a POST route for adding a new shop. This endpoint is expected to be handled by the 'shopController', which should be imported accordingly.
router.post("/addShop", shopController.addShop);

// Registering a GET route to edit shop details. It incorrectly references 'userController' and might be intended to reference 'shopController' instead.
router.put("/editShop", userController.editShop);

// Registering a PUT route to add inventory items. This endpoint should add items to the inventory, typically allowing updates to existing records or adding new ones.
router.post("/addInventory", userController.addInventory);

// Registering a PUT route to edit inventory items. This endpoint should handle requests to update details of existing inventory items.
router.put("/editInventory", userController.editInventory);

// Exporting the router object so it can be used in other parts of the application, like the main server file, to integrate all routes.
module.exports = router;
