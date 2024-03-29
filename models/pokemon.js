const mongoose = require('mongoose')

const { Schema } = mongoose

const PokemonSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    //generation: { type: String, required: true },
    likes: { type: Number, default: 0 },
})

module.exports = mongoose.models.Pokemon || mongoose.model('Pokemon', PokemonSchema)


