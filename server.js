// /**
//  * Introduction to Human-Computer Interaction
//  * Lab 1
//  * --------------
//  * Created by: Michael Bernstein
//  * Last updated: December 2013
//  */
// var PORT = 3000;

// // Express is a web framework for node.js
// // that makes nontrivial applications easier to build
// var express = require('express');
// var exphbs  = require('express-handlebars');

// // Create the server instance
// var app = express();

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');


// // Print logs to the console and compress pages we send
// app.use(express.logger());
// app.use(express.compress());

// // Return all pages in the /static directory
// // whenever they are requested at '/'
// // e.g., http://localhost:3000/index.html
// // maps to /static/index.html on this machine
// app.use(express.static(__dirname + '/static'));

// // Start the server
// var port = process.env.PORT || PORT; // 80 for web, 3000 for development
// app.listen(port, function() {
// 	console.log("Node.js server running on port %s", port);
// });

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.logger());
app.use(express.compress());
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('home', {
    	title: 'Home'
    });
});

app.get('/index', function (req, res) {
    res.render('index', {
    	title: 'Index'
    });
});

app.get('/home', function (req, res) {
    res.render('home', {
    	title: 'Home'
    });
});


app.get('/sign_up', function (req, res) {
    res.render('sign_up', {
    	title: 'Sign Up'
    });
});

app.get('/sign_in', function (req, res) {
    res.render('sign_in', {
    	title: 'Sign In'
    });
});

app.get('/calendar', function (req, res) {
    res.render('calendar', {
    	title: 'Calendar'
    });
});


app.get('/mood_diary', function (req, res) {
    res.render('mood_diary', {
    	title: 'Mood Diary'
    });
});

app.all('*', function(req, res) {
  res.redirect('/');
});

app.listen(3000);