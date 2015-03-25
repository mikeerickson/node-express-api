var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BatterSchema   = new Schema({
	playerID:      {type: String},
	yearID:        {type: Number, required: true},
	teamID:        {type: String, required: true},
	lgID:          {type: String, required: true},
	first_name:    {type: String, required: true},
	last_name:     {type: String, required: true},
	bats:          {stype: String},
	throws:        {stype: String},
	G:             {type: Number},
	AB:            {type: Number},
	R:             {type: Number},
	H:             {type: Number},
	'2B':          {type: Number},
	'3B':          {type: Number},
	HR:            {type: Number},
	RBI:           {type: Number},
	SB:            {type: Number},
	CS:            {type: Number},
	BB:            {type: Number},
	SO:            {type: Number},
	IBB:           {type: Number},
	HBP:           {type: Number},
	SH:            {type: Number},
	SF:            {type: Number},
	GIDP:          {type: Number},
	created_at:    { type: Date, default: Date.now },
	updated_at:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Batter', BatterSchema);
