//node module
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

//eigene requires
const db = require('./api/data/database');
const routes = require('./api/routes');

//variablen
const port = process.env.PORT || '3000';
app.set('port',port);

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//serve static files - prüfen ob path stimmt
app.use(express.static(path.join(__dirname,'public/dist/index.html')));

//set api routes
app.use('/api',routes);

//Return other routes to angular index file
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'public/dist/index.html'));
});

//create htp server - later https
const server = http.createServer(app);
server.listen(port,()=>{
	console.log(`Running on localhost:${port}`);
});