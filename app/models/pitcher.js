var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PitcherSchema   = new Schema({
	playerID:      {type: String},
	yearID:        {type: Number, required: true},
	teamID:        {type: String, required: true},
	lgID:          {type: String, required: true},
	first_name:    {type: String, required: true},
	last_name:     {type: String, required: true},
	bats:          {stype: String},
	throws:        {stype: String},
	created_at:    { type: Date, default: Date.now },
	updated_at:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pitcher', PitcherSchema);
