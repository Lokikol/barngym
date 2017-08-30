//Database Interface 
const mongoose = require('mongoose');

//Get DB Url from config
const config = require('../config');
const dbUrl = config.dbUrl;

//get rid of mongoose promise error
mongoose.Promise = global.Promise;

//connect to database and log error/success - tbd: proper logging
mongoose.connect(dbUrl, function(err) {
    if(err) {
        console.log('Connection error');
    }
	else{
		console.log('Connection to Database established');
	}
});

//bring in models & schemas
require('./models');