// Set up Express router to manage incoming HTTP requests.
const express = require("express");
const tokoController = require("../controllers/TokoController");
const router = express.Router();

// Basic CRUD operations for the "toko" items.
router.post("/", tokoController.CreateFunction); // Create a new item.
router.get("/", tokoController.GetFunction); // Get all items.

// User and session management routes.
router.post("/register", tokoController.registerEvent); // Register a new user.
router.get("/login", tokoController.loginEvent); // User login.

// Item management within the toko.
router.post("/addItem", tokoController.addItemEvent); // Add a new item to the store.
router.put("/addInventoryJumlah", tokoController.addInventoryJumlah); // Increment item quantity in inventory.
router.put("/subInventoryJumlah", tokoController.subInventoryJumlah); // Decrement item quantity in inventory.

// Fetch all items.
router.get("/getAll", tokoController.getAllEvent); // Retrieve all inventory items.

// Cart management operations.
router.post("/addToCart", tokoController.addToCart); // Add an item to the user's cart.
router.post("/subFromCart", tokoController.subFromCart); // Remove an item from the user's cart.
router.get("/getFromCart", tokoController.getFromCart); // Get all items in the user's cart.
router.delete("/removeFromCart", tokoController.removeFromCart); // Delete an item from the cart.

// Inventory management related to sales.
router.put("/subFromInventory", tokoController.subFromInventory); // Adjust inventory after sales.

// Specific item retrieval and modification.
router.get("/:id", tokoController.getById); // Get a specific item by ID.
router.put("/:id", tokoController.UpdateFunction); // Update a specific item by ID.
router.delete("/:id", tokoController.DeleteFunction); // Delete a specific item by ID.

// Make the router available for import in other parts of the application.
module.exports = router;
