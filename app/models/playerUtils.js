"use strict";

module.exports = {
	setData: function(body) {
		var player = {};
		player.first_name = body.first_name;
		player.last_name = body.last_name;
		player.DBL = body.dbl;
		player.TPL = tpl;
		player.HR = HR;
		player.position = body.position;
	}

};
