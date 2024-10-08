const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    image: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

