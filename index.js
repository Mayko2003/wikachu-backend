if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const dbConnection = require('./db');
const express = require('express');
const cors = require('cors');



const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api', require('./routes'));

//configs
app.set('port', process.env.PORT || 3000);

dbConnection.then(() => {
    
    console.log('Connected to DB')
    
    //start server
    app.listen(app.get('port'), () => {
        console.log('Server started on port', app.get('port'));
    });
}).catch((err) => {
    console.log(err);
});

