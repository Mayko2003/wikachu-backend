const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema({
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);