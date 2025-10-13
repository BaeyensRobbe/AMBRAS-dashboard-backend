const express = require("express");
const router = express.Router();
const vaultController = require("../controllers/vaultController");

router.get("/", vaultController.getItems);
router.post("/", vaultController.addItem);
router.put("/:id", vaultController.updateItem);
router.delete("/:id", vaultController.deleteItem);
router.post("/:id/decrypt", vaultController.decryptPassword);

module.exports = router;
