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

var PORT = 3000;
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
  console.log("Node.js server running on port %s", port);
});