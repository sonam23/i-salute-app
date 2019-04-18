const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    user1: String,
    user2: String,
    message: String
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);
