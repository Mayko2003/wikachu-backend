if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { mongoose } = require('./db');
const express = require('express');
const cors = require('cors');



const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes


//configs
app.set('port', process.env.PORT || 3000);

//start server
app.listen(app.get('port'), () => {
    console.log('Server started on port', app.get('port'));
});

