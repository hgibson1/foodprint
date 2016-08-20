var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//CONSTANTS
//These are production values in Kilos CO2/Kilo food
var foods = {
	"LAMB": 39.2,
	"BEEF": 27.0,
	"CHEESE": 13.5,
	"PORT": 12.1,
	"TURKEY": 10.9,
	"CHICKEN": 6.9,
	"TUNA": 6.1,
	"SALMON": 4.1,
	"EGGS": 4.8,
	"POTATOES": 2.9,
	"RICE": 2.7,
	"NUTS": 2.3,
	"BEANS": 2.0,
	"LENTILS": 0.9,
	"FRUIT": 1.1,
	"VEGITABLES": 2.0,
	"GRAINS": 2.8,
	"BAKEDGOODS": 2.8,
	"DRINKS": 0.4,
	"OILS": 1.8,
	"CONDIMENTS": 1.8,
	"SUGARS": 1.8
};

// number of <units>/Kilogram
var units = {
	"POUNDS": 2.2046,
	"OUNCES": 0.1378,
	"GALLONS": 3.7845,
	"PINTS": 0.4731,
}

// packaging
var packages = {
	"CUP": 0.11,
	"BAG": 0.1378,
	"BOTTLE": 3.7845
}


//HELPER FUNCTIONS
//Takes a quanity and unit and returns that quanity in kilos
function convert(quant, unit) {
	return quant/units[unit];
}

// configure app
var app = express();
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

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
		var food = req.body.food;
		var quant = req.body.quantity;
		var unit = req.body.unit;

		var co2 = foods[food] * convert(quant, unit);
		//var co2=food*quant*unit;
		res.json({ co2: co2 });
	})

// get all the food (accessed at GET http://localhost:8080/api/food)
.get(function(req, res) {
	res.json({ message: 'got eats' });
});

// on routes that end in /food
router.route('/packaging')
	.post(function(req, res) {
		var package = req.body.package;
		var quantity = req.body.quantity;

		var co2 = packages[package] * quantity;
		//var co2=food*quant*unit;
		res.json({ co2: co2 });
	})

// get all the food (accessed at GET http://localhost:8080/api/food)
.get(function(req, res) {
	res.json({ message: 'got eats' });
});



router.route('/daily_average')
	.get(function(req, res) {
             var average = '' + 14.93;
             res.json({avg: average});
        });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router); //Think this prefixes the routes with "/api"

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

