const {Schema, model} = require('mongoose');

const creatorSubSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    username:{
        type: String, 
        required: true
    }
  });

const EventSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description:{
        type: String

    },
    creator: {
        type: creatorSubSchema,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    category: {
        type: String,
        default: "personal",
        enum: ["personal", "sport", "business"]
    }


}, {
    timestamps: true
});

module.exports = model('events', EventSchema);