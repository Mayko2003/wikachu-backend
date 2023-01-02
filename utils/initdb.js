const PATH_ROUTES = '../data'
const { Pokemon, Item } = require('../models')
const fs = require('fs')

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

const initDB = () => {
    fs.readdirSync(PATH_ROUTES).filter((file) => {
        const name = removeExtension(file);
        const data = require(`${PATH_ROUTES}/${file}`)
        switch (name) {
            case 'pokemon-species':
                data.forEach((pokemon, i) => {
                    Pokemon.create({ id: i + 1, name: pokemon.name })
                })
                break;
            case 'item':
                data.forEach((item,i) => {
                    Item.create({ id: i + 1, name: item.name })
                })
                break;
            default:
                break;
        }
    })
}

module.exports = initDB

