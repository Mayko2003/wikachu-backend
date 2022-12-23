const express = require('express');
const { pokemonController, authController } = require('../controllers');


const router = express.Router();


router.get('/', pokemonController.getPokemons);
router.get('/popular', pokemonController.getPopularPokemons);
router.get('/generation/:generation', pokemonController.getGenerationPokemons);
router.put('/update/:id', authController.verifyToken, pokemonController.updatePokemon);

module.exports = router