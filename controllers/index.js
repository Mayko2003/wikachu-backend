
const pokemonController = require('./pokemon.controller');
const userController = require('./user.controller');
const authController = require('./auth.controller');
const favouriteController = require('./favourite.controller');
const searchController = require('./search.controller');
const itemController = require('./item.controller')

module.exports = {
    pokemonController,
    userController,
    authController,
    favouriteController,
    searchController,
    itemController
}