 const userModel = require("./models");
 const mongoose			= require('mongoose');
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

const express = require('express')
const app = express()

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []
const hbs				= require('express-handlebars');

app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



//using post function 
//I create a route "/add_user" to add a new user to database
app.post('/addUser', async (request, response) => {
    console.log("reached to user....")
    // here user is a variable which has all data relaed to user
    // that is sent by request.
    const user = new userModel(request.body);
    //I use try/catch block
    try {
        await user.save();
        console.log(user.name);
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Create a route to see users list 
app.get('/users', async (request, response) => {
    console.log("reached to user....")
    // creating a variable which will have data of required modal.
    const users = await userModel.find({});
    //I use try/catch block

    try {

        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
})

// app.post('/login', async (request, response) => {
//     console.log("reached to userLogin....")
//     // here user is a variable which has all data relaed to user
//     // that is sent by request.
//     const users = await userModel.find({});

//     //I use try/catch block
//     try {
//         const val = request.body;
//         console.log(val);
//         var value = Object.entries(users).find(([key, value])=>{
//             if(value.name.toUpperCase() == val.name.toUpperCase() && value.age == val.age){
//                // response.send([key,value.name,value.age]);
//               return [key,value];
//             }
//           })
    
//           if(value!=null){
//             console.log("YES found");


               
//           }else{
//             console.log("not found");
            
//           }
//         console.log(user.name);
//         response.send(user);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// Export this variable to access it in routes.js


app.get('/main', checkAuthenticated, (req, res) => {
  res.render('index.hbs', { name: req.user.username })
})
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.hbs')
})
app.get('/loginfailed', checkNotAuthenticated, (req, res) => {
  res.render('login.hbs',{message:"."})
})

app.post('/login', checkNotAuthenticated, 
passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/loginfailed',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.hbs')
})

app.post('/register', checkNotAuthenticated, 
 async (request, response) => {
  console.log("reached to user....")
  // here user is a variable which has all data relaed to user
  // that is sent by request.
 // const user = new userModel(request.body);
  //I use try/catch block
  const user = new userModel(request.body);
  try {
      await user.save();
      console.log(user.name);

      response.redirect('/login')
  } catch (error) {
      //response.status(500).send(error);
      console.log(error);
      response.redirect('/register')
  }

 
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

  app.post('/signin',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);
module.exports = app;
