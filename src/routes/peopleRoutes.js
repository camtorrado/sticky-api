const express = require("express");
const router = express.Router();
const peopleController = require("../controllers/peopleController");

router.post("/people", peopleController.createPerson);
router.get("/people/:orderId", peopleController.getPersonByOrderId);
router.delete("/people/:id", peopleController.deletePersonById);

module.exports = router;