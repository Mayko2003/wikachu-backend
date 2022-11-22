const mongoose = require('mongoose');

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(url).then(async () => {
    console.log('Connected to Wikachu database');
}).catch(err => {
    console.log('Error connecting to Wikachu database\n', err);
});


module.exports = mongoose;
