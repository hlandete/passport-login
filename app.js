if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', {
    
})
const app = express(process.env.PORT);


require('./auth/auth');

app.use(bodyParser.json());
app.use(routes);


app.listen(process.env.PORT, function(){
    console.log('App listening on ' + process.env.PORT);
})