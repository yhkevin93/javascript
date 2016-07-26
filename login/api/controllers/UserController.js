/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport')

module.exports = {
	//登陆
	login: function(req, res) {

		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if (err) res.send(err);
				return res.send("success")
			})
		})(req, res)
	},
	//进入注册页面
	make: function(req, res) {
		return res.view("make");
	},
    //进入首页
	toMain: function(req, res) {
		console.log("toMain");
		var page = req.param('page')?req.param('page'):1;
		var perPage = req.param('perPage')?req.param('perPage'):10;
		var 分页={};
		User.count().exec(function(err,all){
			分页.总条数 = all;
			分页.总页数 = Math.ceil(all/perPage);
			分页.当前页 = page;
			分页.每页条数 = perPage;
			
			User.find().sort('createdAt DESC').paginate({
				page:page,
				limit:perPage
			}).exec(function(err,user){
				
				console.log({
					分页:分页
				});
				
				return res.view("main",{
				用户:user,
				分页:分页
			})
			
			});
		})
		
		
	},
	//个人设置
	toSet: function(req, res) {

		return res.view("set");
	},

	//注册账号
	success: function(req, res) {
		var user = req.allParams();
		User.create(user).exec(function createCB(err, created) {
			if (err) {
				res.view('passport/register', {
					err: err
				});
			} else {
				console.log("success")
				return res.redirect('/')
			}
		})
	},
	//修改资料
	change: function(req, res) {
		var user = req.user;
		var newAge = req.param('age')
			//错误方法，全修改了
			//		user.update({age:user.age},{age:newAge}).exec(function change(err,update){
			//			if(err){
			//				console.log("修改失败"+err);
			//			}
			//			console.log("修改成功"+update[0].age);
			//		});
		User.findOne({
			name: user.name
		}).exec(function(err, user) {
			if (err) {
				return res.negotiated(err);
			}
			console.log("原来年龄为"+ user.age);
			user.age = newAge;
			user.save()
			console.log("修改成功，年龄为" + newAge);

		});
	},
	
	getMyUsers:function(req,res){
	
		User.find().exec(function (err,users) {
			return res.json(users);
		});
	},
};

