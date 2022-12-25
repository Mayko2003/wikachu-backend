const { Pokemon } = require('../models');

const pokemonController = {}



pokemonController.getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find().sort({ id_pokemon: 1 })
        res.status(200).json({
            data: pokemons
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

pokemonController.getPopularPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find().sort({ likes: -1 }).limit(3)
        res.status(200).json({
            data: pokemons
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

pokemonController.getGenerationPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find({ generation: req.params.generation }).sort({ id_pokemon: 1 })
        res.status(200).json({
            data: pokemons
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

pokemonController.updatePokemon = async (req, res) => {
    try {
        const id = req.params.id
        await Pokemon.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({
            message: 'Pokemon updated'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}




module.exports = pokemonController
