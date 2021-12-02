const Event = require('../models/Event');

// Create and Save a new Tutorial
exports.create = async (req, res) => {

    try{
        // const {first_name, last_name, age} = req.body;

        
        const newEvent = new Event({
            title: "Project X",
            description:"best party ever",
            creator: "61a8729c29c217000f0f9155",
            coordinates: [4.144444,5,444445],
            category: "personal"
        });

        await newEvent.save();
        return res.status(201).json({
            message: "Event was created",
            success: true
        });


    }catch(err){
        console.log(err);
        res.status(400).send({err, message: "wrong data sent to create new event"});

    }
    
};

// Retrieve all Tutorials from the database.
// "/"
exports.findAll = (req, res) => {
    return res.status(200).json({
        message: "we will create something great",
        success: true
    })
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
