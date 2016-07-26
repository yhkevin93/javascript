/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

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
				//              return res.send({
				//                  message: info.message,
				//                  user: user
				//              });
				console.log("登陆成功", {

					用户: user
				})
				return res.redirect('/main')
					//        return res.view("main",{
					//        	用户:user
					//        });
//				return res.send({
//					返回消息:"登陆成功!",
//					用户:user
//				})
			});

		})(req, res);
	},

	logout: function(req, res) {
		console.log("退出成功！")
		req.logout();
		res.redirect('/');
	}
};