// Iteration #1
const mongoose = require('mongoose');
const {Schema, model } = mongoose;


const dronesSchema = new Schema ({
    name: String,
    propellers: Number,
    maxSpeed: Number
},
{timestamps: true});

const Drone = mongoose.model('Drone', dronesSchema);

module.exports = Drone
