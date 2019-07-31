var path = require('path');
var express = require('express');

var PORT = 3000;
var STATIC_URL = path.resolve(__dirname, './public/');
var IMAGE_URLS = [1,2,3,4,5,6,7,8].map(function(n){ return 'http://ece.ubc.ca/~kumseok/src/vsp19/images/image'+n+'.jpg' })

var app = express();	// create an express app

// add CORS headers
app.use(function allowAll(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// print some info on incoming request
app.use(function printRequest(req, res, next){
	console.log('['+(new Date()).toLocaleString()+'] Received '+req.method+' at '+req.originalUrl);
	next();
});

// return the image list
app.get('/images', function(request, response){
	response.json(IMAGE_URLS);
});

// serve static files at the root url
app.use('/', express.static(STATIC_URL));

// start listening on port
app.listen(PORT, function(){
	console.log('Web Service started');
	console.log('    listening on port '+PORT);
	console.log('    serving directory '+STATIC_URL);
});
