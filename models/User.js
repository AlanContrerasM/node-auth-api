const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin", "superadmin"]

    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'events'
      }]

}, {
    timestamps: true
});

module.exports = model('users', UserSchema);