var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});
console.log('listnerin to port 8080');
console.log('dir name is ',__dirname);
app.listen(8080);