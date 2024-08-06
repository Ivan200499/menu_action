const express = require('express');
const menuController = require("../controllers/menuController");

const router = express.Router();

router.get("/", menuController.menuView);

module.exports = router;