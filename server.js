'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const index = require('./routes/index'); // The index router

const app = express(); // Define our app using Express


// Setting our port --------------
let port = process.env.PORT || 8080;
app.set('port',port);


app.use(logger('dev')); // Logging the request info on the console
// Configure server to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// REGISTER OUR ROUTES -------------------------------
app.use('/', index);


// START THE SERVER ----------------------------------
app.listen(app.get('port'), (error) => {
    if(error){console.log('Error Starting the server')}
    else{
        console.log(`Server running on http://localhost:${app.get('port')}`);
    }
});
// ----------------------------------------------------


