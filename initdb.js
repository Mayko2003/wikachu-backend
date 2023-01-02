const PATH_ROUTES = './data'
const { Pokemon, Item } = require('./models')
const fs = require('fs')

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

const initDB = () => {
    fs.readdirSync(PATH_ROUTES).filter((file) => {
        const name = removeExtension(file);
        switch (name) {
            case 'pokemon-species':
                const pokemonData = require(`./data/${file}`)
                pokemonData.forEach((pokemon, i) => {
                    Pokemon.create({ id: i + 1, name: pokemon.name })
                })
                break;
            case 'item':
                const itemData = require(`./data/${file}`)
                itemData.forEach((item,i) => {
                    Item.create({ id: i + 1, name: item.name })
                })
                break;
            default:
                break;
        }
    })
}

module.exports = initDB

