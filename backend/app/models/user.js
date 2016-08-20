var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	username: String
        password: String //this will be hashed
	
});

module.exports = mongoose.model('User', FoodSchema);
