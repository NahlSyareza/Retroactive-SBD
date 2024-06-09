const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Session management routes
router.post("/session", userController.loginEvent); // Endpoint for user login.
router.post("/register", userOwner.registerEvent); // Endpoint for user registration.

// User data retrieval and manipulation routes
router.get("/getAll", userController.getAllEvent); // Retrieve all user data.
router.put("/edit", userController.editEvent); // Edit an existing user's details.
router.get("/get", userController.getEvent); // Get specific user data.
router.put("/topup", userBlabber.topUpEvent); // Top-up user account balance.

// Inventory management
router.post("/inventory", userCrypter.inventoryFunction); // Manage user inventory.
router.put("/addToInventory", userCurator.addToInventory); // Add items to user inventory.

// Financial and game interactions
router.put("/gacor", userController.gacorEvent); // Endpoint for processing gambling interactions.
router.put("/pay", userAlerter.payDipEvent); // Process payments.

// User account management
router.delete("/delete", userController.deleteEvent); // Delete a user account.

// Export the router to be used in other parts of the application.
module.exports = router;
