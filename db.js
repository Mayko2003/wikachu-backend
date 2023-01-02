const mongoose = require('mongoose');
const { Pokemon, Item} = require('./models')
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(url).then(async () => {
    console.log('Connected to Wikachu database');
    if(process.env.IS_DB_INIT === 'false') {
        console.log('Initializing Wikachu database')
        const initDB = require('./initdb');
        await initDB();
    }
}).catch(err => {
    console.log('Error connecting to Wikachu database\n', err);
});


module.exports = mongoose;
