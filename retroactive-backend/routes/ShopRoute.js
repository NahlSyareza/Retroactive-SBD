// Importing the Express library to create and manage the server, routes, and middleware.
const express = require("express");

// Importing the shopController from the 'Controllers' directory, which handles toko-related API endpoints.
const shopController = require("../controllers/ShopController");

// Creating a new router object from Express to handle incoming HTTP requests and map them to corresponding controllers.
const router = express.Router();

// Route for Item
// Route for Create
router.post("/", shopController.CreateFunction);
// Route for Read
router.get("/get", shopController.getAllEvent);
// Route for Read Detail Data
router.get("/:id", shopController.GetDetailFunction);
// Route for Update
router.put("/:id", shopController.UpdateFunction);
// Route for Delete
router.delete("/:id", shopController.DeleteFunction);

// Exporting the router object so it can be used in other parts of the application, like the main server file, to integrate all routes.
module.exports = router;
