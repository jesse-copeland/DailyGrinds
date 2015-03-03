// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Instantiate Express
var app = express();

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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
  Todo.find(function (err, todos) {
    if (err) throw err;
    res.render('todos/list', {todos: todos});
  });
});

app.get('/new', function (req, res) {
  res.render('todos/new');
});

app.post('/todo', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;

  var todo = new Todo({
    title: title,
    description: description
  });

  todo.save(function (err) {
    if (err) throw err;
    res.redirect('/');
  });
});

app.delete('/todo/:id', function (req, res) {
  var id = req.params.id;
  Todo.find({ _id: id }).remove().exec(function (err) {
    if (err) throw err;
    console.log('Record: ' + id + ' has been deleted.');
    res.redirect('/');
  });
});

app.put('/todo/:id/completed', function (req, res) {
  var id = req.params.id;
  var completed = req.body.completed;
  Todo.update({ _id: id }, {$set: { completed: completed }}, function (err, todo) {
    if (err) {
      res.json({"error": err});
    } else if (!todo) {
      res.json({"message": 'todo ' + id + ' not found.'});
    }
  });
});

// Start Server
var server = app.listen(4567, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});