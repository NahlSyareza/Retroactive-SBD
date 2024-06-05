// Importing the Express library to create and manage the server, routes, and middleware.
const express = require("express");

// Importing the tokoController from the 'Controllers' directory, which handles toko-related API endpoints.
const tokoController = require("../controllers/TokoController");

// Creating a new router object from Express to handle incoming HTTP requests and map them to corresponding controllers.
const router = express.Router();

// Route for Item
// Route for Create
router.post("/", tokoController.CreateFunction);

router.get("/", tokoController.GetFunction);

// Route for Read
router.get("/get", tokoController.getAllEvent);

// Plis tolong komenin :D
router.post("/addToCart", tokoController.addToCart);

router.post("/subFromCart", tokoController.subFromCart);

router.get("/getFromCart", tokoController.getFromCart);

router.delete("/removeFromCart", tokoController.removeFromCart);

router.get("/:id", tokoController.GetDetailFunction);
// Route for Update
router.put("/:id", tokoController.UpdateFunction);
// Route for Delete
router.delete("/:id", tokoController.DeleteFunction);

// Exporting the router object so it can be used in other parts of the application, like the main server file, to integrate all routes.
module.exports = router;
