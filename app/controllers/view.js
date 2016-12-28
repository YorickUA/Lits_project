var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
var multipart = require('connect-multiparty');
var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/', router);
};


router.get('/card/:id', function(req, res, next) {
  var id=req.params.id;
  Player.find({_id:id}, function(err, player) {
    player=player[0];
    console.log(player.date_of_birth.toISOString());
    res.render("view_card", player);
  });
});
