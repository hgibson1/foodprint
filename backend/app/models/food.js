var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
	type: String
        //quant: 
	//distance
 	//lbC02
});

module.exports = mongoose.model('Food', FoodSchema);
