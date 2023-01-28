//imports
const fs = require('fs')
const { exit } = require('process');

//connection to db
require('dotenv').config();
const dbConnection = require('../db')

//import models
const models = require('../models')
//path to data folder
const path = `${__dirname}/../data`




const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const removeHyphen = (str) => {
    return str.split('-').shift();
}

const importData = async (model, data) => {
    await Promise.all(data.map(async (element, i) => {
        await model.create({ id: i + 1, name: element.name });
    }));

    console.log(`Imported ${data.length} ${model.modelName} data`);
}

dbConnection.then(async () => {
    console.log('Connected to DB')

    Promise.all(fs.readdirSync(path).map(async (file) => {

        const name = capitalize(removeHyphen(removeExtension(file)));
        const data = require(`${path}/${file}`);

        await importData(models[name], data);

    })).then(() => {
        console.log('All data imported');
        exit(0);
    }).catch((err) => {
        console.log(err);
        exit(1);
    })

}).catch((err) => {
    console.log(err);
    exit(1);
})
