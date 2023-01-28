const { Pokemon } = require('../models')

const SearchController = {}


SearchController.search = async(req, res) => {

    try {
        const q = req.query.q
        const pokemons = await Pokemon.find({ name: { $regex: q, $options: 'i' } })
        res.status(200).json({
            data: {
                pokemons
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


module.exports = SearchController