/**
 * teams.controller.js
 * Mike Erickson <codedungeon@gmail.com>
 * 2016.05.30 18:28 (mikee)
 * =============================================================================
 */

angular.module('statsApp')
	.controller('teamsController', TeamsController);

TeamsController.$inject = ['$http'];
function TeamsController($http) {
  var teams = this;
	
	teams.teamList = [];

	teams.getTeams = function(division) {
		$http.get('/api/v1/teams').then(function(result) {
			var teamList = [];
			result.data.forEach(function(team){
				if(team.lgID === division) {
					teamList.push(team)
				}
			});
			teams.teamList = teamList;
			return teamList;
		});

	};

	teams.init = function() {
		teams.getTeams('AL');
	};

	this.init();

}