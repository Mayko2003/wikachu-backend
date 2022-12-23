const mongoose = require('mongoose')

const { Schema } = mongoose

const FavouriteSchema = new Schema({
    pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.models.Favourite || mongoose.model('Favourite', FavouriteSchema)


