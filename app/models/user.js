var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema    = new Schema({
	username:      { type: String, requried: true},
	email:         { type: String, required: true},
	password:      { type: String, required: true},
	apikey:        { type: String, requried: true},
	created_at:    { type: Date, default: Date.now },
	updated_at:    { type: Date, default: Date.now }
});

UserSchema.statics.findByApiKey = function findByApiKey (apikey, cb) {
	console.log('inner ', apikey);
  return this.where('apikey', apikey).exec(cb);
}

module.exports = mongoose.model('User', UserSchema);
