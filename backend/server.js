var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var mongoose = require('mongoose');

//CONSTANTS
//These are production values in Kilos CO2/Kilo food
var constants = {
	LAMB: 39.2,
	BEEF: 27.0,
	CHEESE: 13.5,
	PORT: 12.1,
	TURKEY: 10.9,
	CHICKEN: 6.9,
	TUNA: 6.1,
	SALMON: 4.1,
	EGGS: 4.8,
	POTATOES: 2.9,
	RICE: 2.7,
	NUTS: 2.3,
	BEANS: 2.0,
	LENTILS: 0.9,
	FRUIT: 1.1,
	VEGITABLES: 2.0,
	GRAINS: 2.8,
	BAKEDGOODS: 2.8,
	DRINKS: 0.4,
	OILS: 1.8,
	CONDIMENTS: 1.8,
	SUGARS: 1.8
};

// configure app
var app = express();
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
//var Food = require('./app/models/food');
//var User = require('./app/modules/user');

// ROUTES FOR OUR API
// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /food
router.route('/food')
	.post(function(req, res) {
		//var bear = new Bear();
		//bear.name = req.body.name;  // set the bears name (comes from the request)

		//bear.save(function(err) {
		//	if (err)
		//		res.send(err);

		//	res.json({ message: 'Bear created!' });
		//});
	        var food = req.body.food;
                var quant = req.body.quantity;
                 
                         
		var co2 = '' + 10; //TODO add actuall calculation
		res.json({co2: co2});
	})

	// get all the food (accessed at GET http://localhost:8080/api/food)
	.get(function(req, res) {
		//Bear.find(function(err, bears) {
		//	if (err)
		//		res.send(err);

		//	res.json(bears);
		//});
                res.json({message: 'got eats'});
	});


router.route('/daily_average')
	.get(function(req, res) {
             var average = 14.93;
             res.json({avg: '' + average});
        });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router); //Think this prefixes the routes with "/api"

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

