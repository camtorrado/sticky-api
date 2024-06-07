// src/routes/peopleRoutes.js
const express = require("express");
const router = express.Router();
const peopleController = require("../controllers/peopleController");

router.post("/people", peopleController.createPerson);

module.exports = router;
