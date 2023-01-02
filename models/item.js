const mongoose = require('mongoose')

const { Schema } = mongoose

const ItemSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
})

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema)


