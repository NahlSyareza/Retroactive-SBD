const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/session", userController.loginEvent); // Endpoint for user login.
router.post("/register", userController.registerEvent); // Endpoint for user registration.
router.get("/getAll", userController.getAllEvent); // Retrieve all user data.
router.put("/edit", userController.editEvent); // Edit an existing user's details.
router.get("/get", userController.getEvent); // Get specific user data.
router.put("/topup", userController.topUpEvent); // Top-up user account balance.
router.post("/inventory", userController.inventoryFunction); // Manage user inventory.
router.put("/gacor", userController.gacorEvent); // Gacor event.
router.put("/pay", userController.payEvent); // Doing the payment.
router.put("/addToInventory", userController.addToInventory); // Endpoint for processing gambling interactions.
router.delete("/delete", userController.deleteEvent); // Delete a user account.
// Export the router to be used in other parts of the application.

module.exports = router;
