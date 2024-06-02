const express = require("express");
const router = express.Router();
const { loginEvent, registerEvent, getEvent, getAllEvent, editEvent, topUpEvent, inventoryFunction, deleteEvent } = require("../controllers/UserController");

// POST route for user login
router.post("/session", loginEvent);

// POST route for user registration
router.post("/register", registerEvent);

// GET route to get user by name
router.get("/", getEvent);

// GET route to get all users
router.get("/all", getAllEvent);

// PUT route to edit user
router.put("/edit", editEvent);

// POST route for top-up
router.post("/topup", topUpEvent);

// POST route for inventory
router.post("/inventory", inventoryFunction);

// DELETE route to delete user
router.delete("/delete", deleteEvent);

module.exports = router;
