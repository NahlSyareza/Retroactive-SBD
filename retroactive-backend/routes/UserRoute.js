const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/session", userController.loginEvent);
router.post("/register", userController.registerEvent);
router.get("/getAll", userController.getAllEvent);
router.put("/edit", userController.editEvent);
router.get("/get", userController.getEvent);
router.put("/topup", userController.topUpEvent);
router.post("/inventory", userController.inventoryFunction);
router.put("/gacor", userController.gacorEvent);
router.put("/pay", userController.payEvent);
router.put("/addToInventory", userController.addToInventory);
router.delete("/delete", userController.deleteEvent);

module.exports = router;
