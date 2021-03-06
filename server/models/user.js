const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    corpId: String,
    role: String,
    teamId: String,
    score: Number
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
