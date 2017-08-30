const mongoose = require('mongoose');

const config = require('../config');
const dbUrl = config.dbUrl;

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, function(err) {
    if(err) {
        console.log('Connection error');
    }
});

//bring in models & schemas
require('./models');