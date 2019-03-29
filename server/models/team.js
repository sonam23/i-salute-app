const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    nameId: String,
    email: String,
    description: String,
}, {timestamps: true});

module.exports = mongoose.model('Team', teamSchema);
