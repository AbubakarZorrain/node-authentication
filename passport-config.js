const LocalStrategy = require('passport-local').Strategy

const User = require("./models");
var passport			= require('passport')
 , localStrategy = require('passport-local').Strategy;
//function initialize(passport, getUserByEmail, getUserById) {
 
  
function initialize(){
passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user){
			console.log("Incorrect Username")
			 return done(null, false, message ='Incorrect username.' );
		}
		if (user.password!=password) {
			console.log("Username OR Password is incorrect");
			return done(null, false, { message: 'Username OR Password is incorrect' });
		  }else {
			console.log("User Loged IN")
			
			return done(null,user, { message: 'User Loged IN' });
		  }
	});
}));
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
}
module.exports = initialize

//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email)
//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Password incorrect' })
//       }
//     } catch (e) {
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
