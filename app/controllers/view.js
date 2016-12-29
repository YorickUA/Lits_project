var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
  Admin=mongoose.model('admin');
var multipart = require('connect-multiparty');
var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/card', router);
};

router.post('/logout', function(req, res){
  var sid = req.session.id;
  var id=req.body.id;
  req.session.destroy(function(err) {
      if (err) return next(err);
        res.redirect(id);
  })
});

router.get('/data/:id', function(req, res, next) {
  var id = req.params.id;
  Player.find({_id:id}, function(err, players) {
    res.send(players);
  });
});

router.get('/:id', function(req, res, next) {
  var id=req.params.id;
  Player.find({_id:id}, function(err, player) {
    player=player[0];
    console.log(player.date_of_birth.toISOString());
    if (req.session.user){
      res.render("edit_card", player);
    }
    else{
      res.render("view_card", player);
    }
  });
})





router.post('/login', function(req, res) {
      var password = req.body.password;
      console.log(password);
      var id=req.body.id;
      Admin.authorize(password, function(err, user) {
        if (err) {
          res.redirect(id);
          }else{
          req.session.user = user._id;
          res.redirect(id);
        }
      });
})
