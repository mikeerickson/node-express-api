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

// SELECT * FROM `Batting` INNER JOIN `Master` ON Batting.playerID = Master.playerID WHERE batting.`yearID` = 2014 ORDER BY `Batting`.playerID;

// SELECT * FROM `Batting` INNER JOIN `Master` ON `Batting`.playerID = `Master`.playerID WHERE `Batting`.yearID = 2014 ORDER BY `Batting`.playerID;

// SELECT `Batting`.playerID, `Batting`.yearID, `Batting`.G, `Fielding`.POS FROM `Batting` INNER JOIN `Fielding` ON Batting.playerID = Fielding.playerID WHERE `Batting`.yearID = 2014 ORDER BY `Batting`.playerID;

// SELECT *
// 	FROM `Batting`
// 	LEFT JOIN `Master` ON Batting.playerID = Master.playerID
// 	LEFT JOIN `Teams` ON Batting.teamID = Teams.teamID
// 	WHERE batting.`yearID` = 2014
// 	ORDER BY `Batting`.playerID;
