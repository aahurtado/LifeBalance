/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// Router variables
var index = require('./routes/index');
var sign_in = require('./routes/sign_in');
var sign_up = require('./routes/sign_up');
var home = require('./routes/home');
var pastData = require('./routes/past_data');
var moodDiary = require('./routes/mood_diary');
var calendar = require('./routes/calendar');
var suggestions = require('./routes/suggestions');
var friends = require('./routes/friends');
var settings = require('./routes/settings');
var help = require('./routes/help');

// Action Routers
var event = require('./routes/event');

var app = express();

// all environments
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.static('static'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(app.router);

// Add routes here
app.get('/', home.view);

app.get('/index', index.view);

app.get('/sign_in', sign_in.view);

app.get('/sign_up', sign_up.view);

app.get('/home', home.view);

app.get('/past_data', pastData.view);

app.get('/past_data/:userName', pastData.viewWithUser);

app.get('/mood_diary', moodDiary.view);

app.get('/calendar', calendar.view);

app.get('/suggestions', suggestions.view);

app.get('/friends', friends.view);

app.get('/settings', settings.view);

app.get('/help', help.view);

app.post('/addEvent', event.addNewEvent);

app.post('/editEvent', event.editEvent);

app.get('/deleteEvent', event.deleteEvent);

app.post('/editMoodEntry', event.editMoodEntry);

/*app.all('*', function(req, res) {
  res.redirect('/');
});*/

var PORT = 3000;
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
    console.log("Node.js server running on port %s", port);
});
