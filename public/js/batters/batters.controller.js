angular.module('statsApp')
  .controller('battersController', BattersController);

BattersController.$inject = ['$http'];

function BattersController($http) {
	var batters = this;

	batters.batterList = [];

	batters.getBatters = function(teamId) {
		$http.get('/api/v1/batters').then(function(result){
			var batterList = [];
			result.data.forEach(function(batter){
				if(batter.teamID === teamId) {
					batterList.push(batter);
				}
			});
			batters.batterList = batterList;
			return batterList;
		});
	};

	batters.init = function() {
		batters.getBatters('BAL')
	}

	this.init();

}