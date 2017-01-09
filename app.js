

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);

});
var app = express();
//require('./config/express')(app, config);
module.exports = require('./config/express')(app, config);


mongoose.connection.once('connected', () => {
  db.db.dropCollection('admins',function(){
    mongoose.model('admin').saveAdmin("Bobick", function(err, user) {
      if (err) {
          return next(err);
      }
      console.log('Success');
    })
  });
});




app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
