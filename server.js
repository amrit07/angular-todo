var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'app')));

//app.use(express.static(path.join(__dirname, 'node_modules/angular')));
//app.use(express.static(path.join(__dirname, 'components')));
//app.use(express.static('app/components'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});
console.log('listnerin to port 8080');
console.log('dir name is ',__dirname);
app.listen(8080);