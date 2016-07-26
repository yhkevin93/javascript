/**
 * WeatherController
 *
 * @description :: Server-side logic for managing weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Weather = require('machinepack-forecast.io');
var age = require('machinepack-age');


module.exports = {
	checkAge: function(req, res) {
		age.calculate({
			dateOfBirth: '1993-07-12'
		}).exec({
			error: function(err) {

			},
			invalidDateFormat: function() {

			},
			success: function(result) {
				console.log("年龄" + result);
			}
		});
	},

	checkWeather: function(req, res) {

		var map = new BMap.Map("container");          // 创建地图实例  
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
        map.centerAndZoom(point, 15);  
 

		
	}
}