var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ManagerSchema   = new Schema({
	playerID:      {type: String},
	yearID:        {type: Number, required: true},
	teamID:        {type: String, required: true},
	lgID:          {type: String, required: true},
	first_name:    {type: String, required: true},
	last_name:     {type: String, required: true},
	G:             {type: Number},
	W:             {type: Number},
	L:             {type: Number},
	rank:          {type: Number},
	created_at:    { type: Date, default: Date.now },
	updated_at:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Manager', ManagerSchema);
