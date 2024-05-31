// Importing the Express library to create and manage the server, routes, and middleware.
const express = require("express");

// Importing the tokoController from the 'Controllers' directory, which handles toko-related API endpoints.
const tokoController = require("../controllers/TokoController");

// Creating a new router object from Express to handle incoming HTTP requests and map them to corresponding controllers.
const router = express.Router();

// Registering a POST route for adding a new toko. This endpoint is handled by the 'tokoController'.
router.post("/toko", tokoController.addtoko);

// Registering a PUT route to edit toko details. This endpoint is handled by the 'tokoController'.
router.put("/toko/edit", tokoController.edittoko);

// Registering a PUT route to reset the password for a toko. This endpoint is handled by the 'tokoController'.
router.put("/toko/reset-password", tokoController.resettokoPassword);

// Registering a POST route to add inventory items associated with a specific toko. This endpoint should handle the creation of new inventory items.
router.post("/inventory", tokoController.addInventory);

// Registering a PUT route to edit existing inventory details associated with a toko. This endpoint should handle requests to update details of existing inventory items.
router.put("/inventory/edit", tokoController.editInventory);

// Registering a DELETE route to delete a toko based on its email. This endpoint is handled by the 'tokoController'.
router.delete("/toko", tokoController.deletetoko);

// Registering a GET route to search tokos by name. This endpoint is handled by the 'tokoController'.
router.get("/toko/search", tokoController.searchtokoByName);

// Registering a GET route to get toko details by email. This endpoint is handled by the 'tokoController' and should retrieve details of a toko using an email parameter.
router.get("/toko/:tokoEmail", tokoController.gettokoDetails);

// Exporting the router object so it can be used in other parts of the application, like the main server file, to integrate all routes.
module.exports = router;
