var express = require('express');
var app = express();
var path = require('path');

app.use('/dist',express.static(path.resolve(__dirname,'app/dist')));
app.use('/css',express.static(path.resolve(__dirname,'app/css')));
app.use('/app',express.static(path.resolve(__dirname,'app')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});
console.log('listening to port 8080');
app.listen(8080);