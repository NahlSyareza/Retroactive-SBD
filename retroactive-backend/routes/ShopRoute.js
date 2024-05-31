// Importing the Express library to create and manage the server, routes, and middleware.
const express = require("express");

// Importing the shopController from the 'Controllers' directory, which handles shop-related API endpoints.
const shopController = require("../Controllers/ShopController");

// Creating a new router object from Express to handle incoming HTTP requests and map them to corresponding controllers.
const router = express.Router();

// Registering a POST route for adding a new shop. This endpoint is handled by the 'shopController'.
router.post("/shop", shopController.addShop);

// Registering a PUT route to edit shop details. This endpoint is handled by the 'shopController'.
router.put("/shop/edit", shopController.editShop);

// Registering a PUT route to reset the password for a shop. This endpoint is handled by the 'shopController'.
router.put("/shop/reset-password", shopController.resetShopPassword);

// Registering a POST route to add inventory items associated with a specific shop. This endpoint should handle the creation of new inventory items.
router.post("/inventory", shopController.addInventory);

// Registering a PUT route to edit existing inventory details associated with a shop. This endpoint should handle requests to update details of existing inventory items.
router.put("/inventory/edit", shopController.editInventory);

// Registering a DELETE route to delete a shop based on its email. This endpoint is handled by the 'shopController'.
router.delete("/shop", shopController.deleteShop);

// Registering a GET route to search shops by name. This endpoint is handled by the 'shopController'.
router.get("/shop/search", shopController.searchShopByName);

// Registering a GET route to get shop details by email. This endpoint is handled by the 'shopController' and should retrieve details of a shop using an email parameter.
router.get("/shop/:shopEmail", shopController.getShopDetails);

// Exporting the router object so it can be used in other parts of the application, like the main server file, to integrate all routes.
module.exports = router;
