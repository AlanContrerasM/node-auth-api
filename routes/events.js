const router = require('express').Router();
//Bring in the events actions from controller
const events = require("../controllers/eventController");

// Create a new Event
router.post("/", events.create);

// Retrieve all events
router.get("/", events.findAll);

// Retrieve a single Event with id
router.get("/:id", events.findOne);

// Update an Event with id
router.put("/:id", events.update);

// Delete an Event with id
router.delete("/:id", events.delete);

// Delete all Events
router.delete("/", events.deleteAll);



module.exports = router;