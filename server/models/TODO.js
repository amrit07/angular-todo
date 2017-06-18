var mongoose = require('mongoose');

var TODO = mongoose.model('TODO', {
    title:String,
    isCompleted:Boolean
});

module.exports = TODO;