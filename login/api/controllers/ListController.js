/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//进入订单创建页面
	
	//订单创建
	listSuccess: function(req, res) {
		var list = req.allParams();
		List.create(list).exec(function (err, created) {
		console.log("订单创建成功");
		console.log(created);
	})
	},
	
	makelist:function(req,res){
		return res.view('makelist')
	},
	
	getMyList:function(req,res){
		List.find().exec(function (err,list){
			return res.json(list);
		});
	}
	
};

