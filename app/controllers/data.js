var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/', router);
};


router.get('/data', function(req, res, next) {

  Player.find({}, function(err, players) {

    res.send(players);
  });
});

router.get('/data/:id', function(req, res, next) {
  var id = JSON.parse(req.params.id);
  console.log(filter_data);
  Player.find({_id:id}, function(err, players) {
    res.send(players);
  });
});


function exists(route){
try{
   fs.statSync(route);
 }catch(err){
   if(err.code == 'ENOENT') return false;
 }
 return true;
}
