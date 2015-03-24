var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BatterSchema   = new Schema({
	playerID:      String,
	yearID:        Number,
	teamID:        String,
	lgID:          String,
	first_name:    String,
	last_name:     String,
	league:        String,
	bats:          String,
	throws:        String,
	G:             Number,
	AB:            Number,
	R:             Number,
	H:             Number,
	'2B':          Number,
	'3B':          Number,
	HR:            Number,
	RBI:           Number,
	SB:            Number,
	CS:            Number,
	BB:            Number,
	SO:            Number,
	IBB:           Number,
	HBP:           Number,
	SH:            Number,
	SF:            Number,
	GIDP:          Number
});

module.exports = mongoose.model('Batter', BatterSchema);
