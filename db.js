const mongoose = require('mongoose');
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = mongoose.connect(url);