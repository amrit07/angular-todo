var express = require('express');
var app = express(); //Creates our app
var path = require('path'); // Required for resolving same path directories for different file structure(OS)
var bodyParser = require('body-parser'); // Pulls info from html post
var morgan = require('morgan'); // log requests to the console (express4)
var mongoose = require('mongoose');

var TODO = require(path.resolve(__dirname, 'server/models/TODO'));



app.use('/dist', express.static(path.resolve(__dirname, 'app/dist')));
app.use('/css', express.static(path.resolve(__dirname, 'app/css')));
app.use('/app', express.static(path.resolve(__dirname, 'app')));

// viewed at http://localhost:8000
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});


//API Code
mongoose.connect('mongodb://localhost:27017/todo');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: Unable to connect to mongodb'));
db.once('open', function () {
    /**
     * api end point for populating the list of apis
     */
    app.get('/api/v1/todos', function (req, res) {
        TODO.find(function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos); // return all todos in JSON format
        });
    });

    /**
     * creates a todoItem and updates in db
     */
    app.post('/api/v1/todos', function (req, res) {
        TODO.create({
            title: req.body.title,
            isCompleted: req.body.isCompleted
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        });
    });

    /**
     * deletes a todoItem
     */
    app.delete('/api/v1/todos/:todo_id', function (req, res) {
        TODO.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err) {
                send(err);
            }

        });

    });

    /**
     * updates a todoItem
     */
    app.put('/api/v1/todos', function (req, res) {
        TODO.findOneAndUpdate({
            _id: req.body._id
        }, {
            title: req.body.title,
            isCompleted: req.body.isCompleted
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            res.send('ok');
        })
    });
});


console.log('listening to port 8080');
app.listen(8000);
