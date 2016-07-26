var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(name, password, done) {

    User.findOne({name: name 
    }, function (err, user) {
      if (err) { 
      	return done(err); 
      }
      if (!user) {
        return done(null, false, { message: '错误姓名' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res){
            return done(null, false, {
              message: '密码错误'
            });}
            // 需要根据角色判断读取相关的项目信息
          var returnUser = {
            name: user.name,
            age:user.age,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: '登陆成功'
          });
        });
    });
  }
));