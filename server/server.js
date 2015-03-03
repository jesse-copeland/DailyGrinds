// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Instantiate Express
var app = express();

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../public'));

mongoose.connect('mongodb://localhost/daily_grinds');

// Schema
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title:       { type: String, trim: true, required: true },
  description: { type: String },
  completed:   { type: Boolean, default: false },
  created_at:  { type: Date, default: Date.now }
});

var Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/', function (req, res) {
  res.render('todos/list');
});

app.get('/new', function (req, res) {
  res.render('todos/new');
});

// Start Server
var server = app.listen(4567, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});