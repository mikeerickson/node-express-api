var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PitcherSchema   = new Schema({
  playerID:      {type: String},
  yearID:        {type: Number, required: true},
  teamID:        {type: String, required: true},
  lgID:          {type: String, required: true},
  first_name:    {type: String, required: true},
  last_name:     {type: String, required: true},
  bats:          {type: String},
  throws:        {type: String},
  W:             {type: Number},
  L:             {type: Number},
  G:             {type: Number},
  GS:            {type: Number},
  CG:            {type: Number},
  SHO:           {type: Number},
  SV:            {type: Number},
  H:             {type: Number},
  R:             {type: Number},
  ER:            {type: Number},
  HR:            {type: Number},
  BB:            {type: Number},
  IBB:           {type: Number},
  SO:            {type: Number},
  BAOpp:         {type: Number},
  ERA:           {type: Number},
  WP:            {type: Number},
  HBP:           {type: Number},
  BK:            {type: Number},
  BFP:           {type: Number},
  GF:            {type: Number},
  created_at:    {type: Date, default: Date.now },
  updated_at:    {type: Date, default: Date.now }
});

module.exports = mongoose.model('Pitcher', PitcherSchema);
