const { Pokemon, Item, Move, Nature } = require('../models')

const SearchController = {}


SearchController.search = async(req, res) => {

    try {
        const q = req.query.q
        const pokemons = await Pokemon.find({ name: { $regex: q, $options: 'i' } })
        const items = await Item.find({ name: { $regex: q, $options: 'i' } })
        const moves = await Move.find({ name: { $regex: q, $options: 'i' } })
        const natures = await Nature.find({ name: { $regex: q, $options: 'i' } })

        res.status(200).json({
            data: {
                pokemons,
                items,
                moves,
                natures
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


module.exports = SearchController