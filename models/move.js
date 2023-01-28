const mongoose = require('mongoose')

const MoveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.models.Move || mongoose.model('Move', MoveSchema)