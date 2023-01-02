const mongoose = require('mongoose')

const { Schema } = mongoose

const FavouriteSchema = new Schema({
    obj: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    onModel: {
        type: String,
        required: true,
        enum: ['Pokemon', 'Ability', 'Move', 'Item', 'Type']
    }
})

module.exports = mongoose.models.Favourite || mongoose.model('Favourite', FavouriteSchema)


